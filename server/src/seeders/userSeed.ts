import mongoose from "mongoose";
import UserModel, { User } from "../models/UserModel";

const DB_LINK = process.env.DB_LINK || "mongodb://localhost/user";

let userSeed = [
  {
    email: "test@domain.com",
    password: "1234567"
  },
  {
    email: "test2@domain.com",
    password: "1234567"
  }
];

function seedUsers(seed: User[]) {
  UserModel.deleteMany({})
    .then(() => UserModel.insertMany(seed))
    .then(data => {
      console.log(data.length + " records inserted!");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

mongoose
  .connect(DB_LINK, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => {
    seedUsers(userSeed);
  })
  .catch(error => {
    console.log(error);
  });