const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    Application: { type: String, required: true },
    Overdue: { type: Number },
    Current: { type: Number },
    Month1: { type: Number },
    "Month 2": { type: Number },
    "Month 3": { type: Number },
    Future: { type: Number },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscriptions", subscriptionSchema);

module.exports = Subscription;
