import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  product: {
    name: String,
    price: Number,
    image: String,
  },

  size: String,

  customer: {
    email: String,
    phone: String,
    address: String,
    city: String,
    country: String,
  },

  totalUsd: Number,

  paymentMethod: {
    type: String,
    default: "USDC",
  },

  paymentStatus: {
    type: String,
    default: "pending",
  },

  txHash: String,
  proofImage: String,

}, { timestamps: true });

export default mongoose.model("Order", orderSchema);