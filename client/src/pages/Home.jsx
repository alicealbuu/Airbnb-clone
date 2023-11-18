import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AccountNavigation from "../components/AccountNavigation";

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces(response.data);
    });
  }, []);

  return (
    <div>
      <AccountNavigation />
      <div className="mt-8 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-4 px-8">
        {places.length > 0 &&
          places.map((place) => (
            <Link to={"/place/" + place._id} key={place.id}>
              <div className="rounded-2xl bg-gray-500 flex mb-2">
                {place.photos?.[0] && (
                  <img
                    className="rounded-2xl object-cover aspect-square"
                    src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                    alt=""
                  ></img>
                )}
              </div>
              <h2 className="font-bold ">{place.address}</h2>
              <h3 className="text-sm text-gray-500">{place.title}</h3>

              <div className="mt-1">
                <span className="font-bold">${place.price}</span> per night
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
