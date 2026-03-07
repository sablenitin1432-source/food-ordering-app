import mongoose from "mongoose"

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://sable_nitin1432_db_user:Nitin1432@cluster0.k1du0q0.mongodb.net/online-food-delivery').then(() => console.log("DB Connected"));
}