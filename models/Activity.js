import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    action: String,
  },
  { timestamps: true }
);

export default mongoose.model("Activity", activitySchema);