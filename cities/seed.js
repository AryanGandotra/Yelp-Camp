const mongoose = require("mongoose");
const Campground = require("../models/campGround");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const axios = require("axios");
require("dotenv").config();

const connectionString = process.env.DB_CONNECTION_STRING;
const unsplashKey = process.env.UNSPLASH_KEY;
const USER_ID = process.env.USER_ID;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

// call unsplash and return small image
async function seedImg() {
  try {
    const resp = await axios.get("https://api.unsplash.com/photos/random", {
      params: {
        client_id: unsplashKey,
        collections: 1114848,
      },
    });
    return resp.data.urls.small;
  } catch (err) {
    console.error(err);
  }
}

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 500; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dzxl21os3/image/upload/v1688920107/YelpCamp/hgfanlyjeevku1ygujey.jpg",
          filename: "YelpCamp/hgfanlyjeevku1ygujey",
        },
        {
          url: "https://res.cloudinary.com/dzxl21os3/image/upload/v1688920111/YelpCamp/kmbd2pshcj8slq2shz6s.jpg",
          filename: "YelpCamp/kmbd2pshcj8slq2shz6s",
        },
      ],
      author: USER_ID,
      geometry: { type: "Point", coordinates: [cities[random1000].longitude, cities[random1000].latitude] },
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis, nihil tempora vel aspernatur quod aliquam illum! Iste impedit odio esse neque veniam molestiae eligendi commodi minus, beatae accusantium, doloribus quo!",
      price: price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
