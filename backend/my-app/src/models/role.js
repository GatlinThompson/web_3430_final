import mongoose from "mongoose";

const Schema = mongoose.Schema;

let RoleSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export let Role = mongoose.model("Role", RoleSchema);
