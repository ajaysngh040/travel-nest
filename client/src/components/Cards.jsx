import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Skeleton } from "antd";
import Image from "../components/Image";

const BASE_URL = import.meta.env.VITE_DEV_URL || import.meta.env.VITE_PROD_URL;

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places/").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div className="mt-36 sm:mt-24 mb-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {places.length > 0
        ? places.map((place) => (
            <Link
              to={`/place/${place._id}`}
              key={place._id}
              className="flex flex-col gap-2 bg-white p-4 rounded-xl shadow-lg"
            >
              {/* Image container */}
              <div className="relative w-full h-64 rounded-xl overflow-hidden bg-gray-100">
                {place.photos?.[0] ? (
                  <ImageWithSkeleton
                    src={place.photos[0]}
                    alt={place.title || "Place image"}
                  />
                ) : (
                  <Skeleton.Image
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>

              {/* Title and address */}
              <div className="flex justify-between mt-2">
                {!place.title || !place.address ? (
                  <Skeleton.Input style={{ width: 200 }} active size="small" />
                ) : (
                  <p className="text-sm font-medium">
                    {place.title}, {place.address}
                  </p>
                )}

                {/* Rating */}
                <div className="flex justify-center items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm font-light">5.0</p>
                </div>
              </div>

              {/* Price, distance, and date */}
              {!place.price ? (
                <Skeleton.Input style={{ width: 100 }} active size="small" />
              ) : (
                <div className="mt-1">
                  <p className="text-gray-500">63 kilometers away</p>
                  <p className="text-gray-500">22-27 Jul</p>
                  <span className="font-semibold">${place.price}</span> per
                  night
                </div>
              )}
            </Link>
          ))
        : Array(4) // Skeleton loaders for placeholders
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 bg-white p-4 rounded-xl shadow-lg"
              >
                <Skeleton.Image
                  style={{ height: 200, width: "100%", objectFit: "cover" }}
                />
                <Skeleton.Input style={{ width: 200 }} active size="small" />
                <Skeleton.Input style={{ width: 100 }} active size="small" />
              </div>
            ))}
    </div>
  );
}

// eslint-disable-next-line react/prop-types
function ImageWithSkeleton({ src, alt }) {
  const [loading, setLoading] = useState(true);

  const handleImageLoaded = () => {
    setLoading(false);
  };

  // Ensure the src is correct before adding to srcSet
  const getImageSrcSet = (src) => {
    // eslint-disable-next-line react/prop-types
    if (!src.startsWith("http") && !src.startsWith("/uploads/")) {
      src = `${BASE_URL}/uploads/${src}`;
    }

    return `
      ${src}?w=480 480w,
      ${src}?w=768 768w,
      ${src}?w=1024 1024w,
      ${src}?w=1440 1440w
    `;
  };

  return (
    <div className="relative w-full h-full">
      {loading && <Skeleton.Image style={{ height: "100%", width: "100%" }} />}
      <Image
        className={`absolute inset-0 w-full h-full rounded-xl object-cover transition-opacity duration-500 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={handleImageLoaded}
        onError={() => setLoading(false)}
        srcSet={getImageSrcSet(src)}
        sizes="(max-width: 480px) 100vw, 
               (max-width: 768px) 50vw, 
               (max-width: 1024px) 33vw, 
               25vw"
      />
    </div>
  );
}
