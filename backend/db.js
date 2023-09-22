const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://adi8218769976:adityamishra8218769976@cluster0.yfwbksv.mongodb.net/food-app?retryWrites=true&w=majority";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log("Mongo connected Successfully");

    const fetched_mongoData = await mongoose.connection.db.collection(
      "food_items"
    );
    const fethed_mongoCategoryData = await mongoose.connection.db.collection("foodCategory");
    const data = await fetched_mongoData.find({}).toArray();
    const categoryData = await fethed_mongoCategoryData.find({}).toArray();

    global.food_items = data;
    global.foodCategory = categoryData;
   
  } catch (error) {
    console.error("---", error);
  }
};

module.exports = connectMongoDB;
