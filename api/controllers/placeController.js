const jwt = require("jsonwebtoken");
const Place = require("../models/placeModel");
const Booking = require("../models/bookingModel");

//1. Create new place //route POST/places // Public
const createNewPlace = (req, res) => {
  const { token } = req.cookies;
  console.log(req.body);
  const {
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
  } = req.body;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
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
    });
    res.json(placeDoc);
  });
};

//2. Get user places //route GET/user-places // Public
const getAllUserPlaces = (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) {
      // Handle JWT verification error
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = userData;
    // Assuming your "Place" model and the field "owner" are defined correctly
    try {
      const places = await Place.find({ owner: id });
      res.json(places);
    } catch (error) {
      // Handle any database query errors
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

//3. Get single place by id //route GET/places/:id // Private
const getSinglePlace = async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
};

//4.Update place //route PUT/places
const updatePlace = async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
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
  } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;

    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
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
      });
      await placeDoc.save();
      res.json("ok");
    }
  });
};

//4. Get all places //route GET/places // Private
const getAllPlaces = async (req, res) => {
  res.json(await Place.find());
};

module.exports = {
  createNewPlace,
  getAllUserPlaces,
  getSinglePlace,
  updatePlace,
  getAllPlaces,
};
