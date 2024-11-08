import mongoose from "mongoose";

export const connect = (url) => {
  mongoose.connect(url, {});

  mongoose.connection.on("connected", () => {
    console.log(`Connect to ${url}`);
  });

  mongoose.connection.on("error", () => {
    console.log(`Connect error: ${url}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log(`Disconnected from ${url}`);
  });
};
