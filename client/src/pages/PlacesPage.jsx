import { useEffect, useState } from "react";
import AccountNavigation from "../components/AccountNavigation";
import { Link } from "react-router-dom";
import axios from "axios";
import PlaceImg from "../components/PlaceImg";

export default function PlacesPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/user-places").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div>
      <AccountNavigation />
      <div className="text-center py-4 px-8">
        {/* List of all added places */}
        <Link
          className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
          to={"/account/places/new"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>

      <div className="mt-4 px-4 ">
        {places.length > 0 &&
          places.map((place, index) => {
            return (
              <Link
                to={"/account/places/" + place._id}
                key={index}
                className="mb-4 flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl grow "
              >
                <div className="flex flex-shrink-0 w-32 h-32 bg-gray-300">
                  <PlaceImg place={place} />
                </div>
                <div>
                  <h2 className="text-xl">{place.title}</h2>
                  <p className="text-sm mt-2 ">{place.description}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
}
