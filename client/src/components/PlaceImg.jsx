/* eslint-disable react/prop-types */
export default function PlaceImg({ place, index = 0 }) {
  if (!place.photos?.length) {
    // Return a placeholder image or fallback content
    return (
      <div className="w-full h-full bg-gray-300 flex items-center justify-center">
        No Image Available
      </div>
    );
  }

  return (
    <img
      className="object-cover w-full h-full"
      src={"http://127.0.0.1:4000/uploads/" + place.photos[index]}
      alt={`Place ${index + 1}`}
    />
  );
}
