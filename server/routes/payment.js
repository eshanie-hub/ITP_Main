const express = require('express');
const payment = require('../model/payment');
const order_placement = require('../model/order_placement');

const router = express.Router();

// Adding data
router.route("/add").post(async (req, res) => {
  const { OrderNo, PaymentId, Date, Payment, CustomerName } = req.body;

  try {
    // Calculate the RemainingCredit
    const order = await order_placement.findOne({ OrderNo });
    const remainingCredit = order ? order.amount - Payment : 0;

    const newPaymentH = new payment({
      OrderNo,
      PaymentId,
      Date,
      Payment,
      CustomerName, 
    
    });

    await newPaymentH.save();
    res.json("New payment added");
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "Error adding payment", error: err.message });
  }
});

// Get data
router.route("/").get((req, res) => {
  payment.find()
    .then((payment) => {
      res.json(payment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ status: "Error", error: err.message });
    });
});

// Updating data
router.route('/update/:id').put(async (req, res) => {
  const id = req.params.id;
  const { OrderNo, PaymentId, Date, CustomerName, Payment, Status } = req.body;

  const updatePaymentH = {
    OrderNo,
    PaymentId,
    Date,
    CustomerName,
    Payment,
    Status
  };

  try {
    // Fetch the CustomerName from Order Placement
    const order = await order_placement.findOne({ OrderNo });
    const customerName = order ? order.customerName : "";

    // Calculate the RemainingCredit
    const remainingCredit = order ? order.amount - Payment : 0;

    await payment.findByIdAndUpdate(id, { ...updatePaymentH, CustomerName: customerName });
    res.status(200).send({ status: "Payment was updated" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error with updating data", error: err.message });
  }
});

// Delete
router.route("/delete/:id").delete(async (req, res) => {
  const id = req.params.id;

  try {
    await payment.findByIdAndDelete(id);
    res.status(200).send({ status: "Payment was deleted" });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({ status: "Error with deleting item", error: err.message });
  }
});

router.route("/get/:id").get((req, res) => {
  const id = req.params.id;

  payment.findById(id)
    .then((payment) => {
      res.json(payment);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ status: "Error", error: err.message });
    });
});

module.exports = router;
