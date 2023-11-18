import axios from "axios";
import PhotoUploader from "../components/PhotoUploader";
import Perks from "../components/Perks";
import { useEffect, useState } from "react";
import AccountNavigation from "../components/AccountNavigation";
import { Navigate, useParams } from "react-router-dom";

export default function PlacesFormPage() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    } else {
      axios.get("/places/" + id).then((response) => {
        const { data } = response;
        setTitle(data.title);
        setAddress(data.address);
        setPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      });
    }
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }

  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(e) {
    e.preventDefault();

    const placeData = {
      title,
      address,
      photos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    };

    if (id) {
      //update
      await axios.put("/places", { id, ...placeData });
      setRedirect(true);
    } else {
      //new place
      await axios.post("/places", placeData);
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <>
      <AccountNavigation />
      <div>
        <form className="py-4 px-8" onSubmit={savePlace}>
          {/* Title */}
          {preInput(
            "Title",
            "Title for your place. should be short and catchy as in advertisment"
          )}
          <input
            type="text"
            placeholder="title, for example: My lovely apt"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />

          {/* Address */}
          {preInput("Address", "Address for this place")}
          <input
            type="text"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          {/* Photos */}
          {preInput("Photos", "more = better")}
          <PhotoUploader photos={photos} onChange={setPhotos} />

          {/* Description */}
          {preInput("Description", "Description of the place")}
          <textarea
            className="w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          {/* Perks */}
          {preInput("Perks", "Select all the perks of your place")}

          <div className="grid mt-2 grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
            <Perks perks={perks} setPerks={setPerks} />
          </div>

          {/* ExtraInfo */}
          {preInput("Extra info", "house rules, etc")}
          <textarea
            className="w-full"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />

          {/* Check in / Check out */}
          {preInput(
            "Check in&out times, max guests",
            "add check in and out times, remember to have some time window for cleaning the room between guests"
          )}

          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                type="text"
                placeholder="21:00"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>

            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="text"
                placeholder="12:00"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>

            <div>
              <h3 className="mt-2 -mb-1">Max numbers of guests</h3>
              <input
                type="text"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>

            <div>
              <h3 className="mt-2 -mb-1">Price per night</h3>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button className="primary my-4">Save</button>
          </div>
        </form>
      </div>
    </>
  );
}
