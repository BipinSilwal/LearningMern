import dotenv from "dotenv";
import connectDB from "./config/db/connect.js";
import JOB from "./models/Job.js";
import { readFile } from "fs/promises";

dotenv.config({ path: "config/config.env" });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await JOB.deleteMany();

    const jsonProducts = JSON.parse(
      await readFile(new URL("./dataSeed.json", import.meta.url))
    );

    await JOB.create(jsonProducts);
    console.log("Success!!");

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
