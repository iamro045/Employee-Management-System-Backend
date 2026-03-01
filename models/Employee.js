import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: String,
  department: String,
  salary: Number,
  phone: String,
  address: String,
});

export default mongoose.model("Employee", employeeSchema);