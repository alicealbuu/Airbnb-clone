import { useState } from "react";
import Header from "./Header";

/* eslint-disable react/prop-types */
export default function PlaceGallery({ place }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  if (showAllPhotos) {
    return (
      <>
        <Header />
        <div className="absolute inset-0 bg-black text-white  min-h-screen">
          <div className="bg-black p-8 grid gap-4">
            <div>
              <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
              <button
                onClick={() => {
                  setShowAllPhotos(false);
                }}
                className="right-12 top-8 fixed flex gap-1 py-2 px-4 rounded-2xl bg-gray shadow shadow-black bg-white text-black"
              >
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Close photos
              </button>
            </div>
            {place?.photos?.length > 0 &&
              place.photos.map((photo) => (
                <img
                  key={photo._id}
                  src={"http://127.0.0.1:4000/uploads/" + photo}
                />
              ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="relative">
      <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
        <div className="flex flex-col">
          {place.photos?.[0] && (
            <div className="flex-1">
              <img
                onClick={() => {
                  setShowAllPhotos(true);
                }}
                className="object-cover cursor-pointer h-full"
                src={"http://127.0.0.1:4000/uploads/" + place.photos[0]}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          {place.photos?.[1] && (
            <div className="flex-1">
              <img
                onClick={() => {
                  setShowAllPhotos(true);
                }}
                className="object-cover cursor-pointer h-full"
                src={"http://127.0.0.1:4000/uploads/" + place.photos[1]}
              />
            </div>
          )}

          <div className="flex-1 overflow-hidden">
            {place.photos?.[2] && (
              <img
                onClick={() => {
                  setShowAllPhotos(true);
                }}
                className="object-cover relative top-2 cursor-pointer h-full"
                src={"http://127.0.0.1:4000/uploads/" + place.photos[2]}
              />
            )}
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowAllPhotos(true)}
        className="bg-white rounded-2xl shadow-md shadow-gray-500 absolute bottom-2 right-2 py-2 px-4 gap-1 flex"
      >
        Show more photos
      </button>
    </div>
  );
}
