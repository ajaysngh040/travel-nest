import AccountNav from "../components/AccountNav";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";
import { Link } from "react-router-dom";
import BookingDates from "../components/BookingDates";
import { Skeleton } from "antd"; // Import Skeleton from Ant Design
import { UserContext } from "../context/UserContext";

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`/bookings?userId=${user?.id}`, { withCredentials: true })

      .then((response) => {
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error.response);
      });
  }, [user]);

  return (
    <div>
      <AccountNav />
      <div className="container mx-auto p-4">
        {loading ? (
          // Skeleton Loader for Mobile and Desktop
          Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="flex gap-4 bg-gray-100 rounded-2xl overflow-hidden mb-4"
              >
                <div className="w-48">
                  <Skeleton.Image className="w-full h-32" />
                </div>
                <div className="py-3 pr-3 grow">
                  <Skeleton.Input active style={{ width: "80%" }} />
                  <Skeleton.Input
                    active
                    style={{ width: "60%" }}
                    className="mt-2"
                  />
                  <Skeleton.Input
                    active
                    style={{ width: "50%" }}
                    className="mt-2"
                  />
                </div>
              </div>
            ))
        ) : bookings?.length > 0 ? (
          bookings.map((booking) => (
            <Link
              key={booking._id}
              to={`/account/bookings/${booking._id}`}
              className="flex gap-4 bg-gray-100 hover:bg-gray-200 rounded-2xl overflow-hidden mb-4"
            >
              <div className="w-48">
                <PlaceImg place={booking.place} />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-md font-medium">{booking.place.title}</h2>
                <div className="text-sm font-light">
                  <BookingDates
                    booking={booking}
                    className="mb-4 mt-4 text-gray-500"
                  />
                  <div className="flex justify-start items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      Total price: ${booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No bookings available.</p>
        )}
      </div>
    </div>
  );
}
