/* eslint-disable react/prop-types */
import axios from "axios";
import { useState } from "react";
import Image from "../components/Image";

export default function PhotosUploader({ addedPhotos, onChange }) {
  const [photoLink, setPhotoLink] = useState("");

  // Function to add a photo by URL
  const handleAddPhotoByLink = async (ev) => {
    ev.preventDefault();
    if (!photoLink.trim()) return;

    try {
      const { data } = await axios.post("/uploads/url", {
        link: photoLink,
      });

      if (data?.imageUrl && typeof data.imageUrl === "string") {
        // Prevent duplicate photos
        if (!addedPhotos.includes(data.imageUrl)) {
          onChange((prev) => [...prev, data.imageUrl]);
        }
      } else {
        console.error("Unexpected response:", data);
      }

      setPhotoLink("");
    } catch (error) {
      console.error("Error uploading photo by link:", error);
    }
  };

  // Function to upload a photo file
  const handleUploadPhoto = async (ev) => {
    const files = ev.target.files;
    if (!files.length) return;

    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append("photos", file));

    try {
      const { data } = await axios.post("/uploads/file", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data?.imageUrls && Array.isArray(data.imageUrls)) {
        // Add only unique image URLs
        const newPhotos = data.imageUrls.filter(
          (url) => !addedPhotos.includes(url)
        );
        onChange((prev) => [...prev, ...newPhotos]);
      } else {
        console.error("Unexpected response:", data);
      }
    } catch (error) {
      console.error("Error uploading photos:", error);
    }
  };

  // Function to remove a photo
  const handleRemovePhoto = (ev, photoUrl) => {
    ev.preventDefault();
    onChange(addedPhotos.filter((photo) => photo !== photoUrl));
  };

  // Function to set a photo as the main photo
  const handleSelectAsMainPhoto = (ev, photoUrl) => {
    ev.preventDefault();
    onChange([photoUrl, ...addedPhotos.filter((photo) => photo !== photoUrl)]);
  };

  return (
    <>
      {/* Photo Upload by Link */}
      <div className="flex gap-2">
        <input
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          type="text"
          placeholder="Add using a link (e.g., https://example.com/image.jpg)"
          className="border rounded-lg p-2 w-full"
        />
        <button
          onClick={handleAddPhotoByLink}
          className="bg-gray-100 hover:bg-gray-200 px-4 text-sm font-medium rounded-lg"
        >
          Add Photo
        </button>
      </div>

      {/* Uploaded Photos Grid */}
      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos
          .filter((photo) => typeof photo === "string") // Ensure valid URLs
          .map((photoUrl) => (
            <div className="h-32 flex relative" key={photoUrl}>
              <Image
                className="rounded-lg w-full object-cover"
                src={photoUrl}
                alt="Uploaded"
              />
              {/* Remove Button */}
              <button
                onClick={(ev) => handleRemovePhoto(ev, photoUrl)}
                className="absolute bottom-1 right-1 text-white bg-black bg-opacity-50 hover:bg-opacity-100 rounded-lg p-2"
              >
                ✖
              </button>
              {/* Select as Main Photo Button */}
              <button
                onClick={(ev) => handleSelectAsMainPhoto(ev, photoUrl)}
                className="absolute bottom-1 left-1 text-white bg-black bg-opacity-50 hover:bg-opacity-100 rounded-lg p-2"
              >
                {photoUrl === addedPhotos[0] ? "★" : "☆"}
              </button>
            </div>
          ))}

        {/* File Upload Button */}
        <label className="h-32 cursor-pointer flex items-center justify-center border bg-transparent rounded-lg p-2 text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleUploadPhoto}
          />
          <span className="text-sm font-medium">Upload</span>
        </label>
      </div>
    </>
  );
}
