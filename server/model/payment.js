const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  OrderNo: {
    type: String,
    required: true,
  },
  PaymentId: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  Payment: {
    type: Number,
    required: true,
  },
  CustomerName: { 
    type: String,
    required: true,
  },
 
});

module.exports = mongoose.model("payment", PaymentSchema);
