const express = require("express");
const CustomerCare = require("../model/customer");
const nodemailer = require("nodemailer");
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vidmaroofing@gmail.com",
    pass: "axdq ixot gtki fpeq",
  },
});

//adding data
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const date = req.body.date;
  const type = req.body.type;
  const mail = req.body.mail;
  const message = req.body.message;
  const status = "Pending";

  const customerCare = new CustomerCare({
    name,
    date,
    type,
    mail,
    message,
    status,
  });
  customerCare
    .save()
    .then(() => {
      const mailOptions = {
        from: "vidmaroofing@gmail.com",
        to: mail,
        subject: "Thank You for Your Feedback!",
        text: `
Dear ${name},

Thank you for taking the time to share your feedback with us. We greatly appreciate your insights.

Please note that this is an automated message generated to acknowledge the receipt of your feedback. Rest assured that our team has received your message and will review it carefully. We strive to provide the best possible support and will get back to you within the next 3 days.

If you have any further questions or concerns, please don't hesitate to reach out to us.


Best regards,
The Vidma Roofing Support Team.`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Email send failed with error:", error);
        } else {
          console.log("Email sent successfully");
        }
      });
      res.json("Your feedback is sent..!");
    })
    .catch((err) => {
      console.log(err);
    });
});

//get data
router.route("/").get((req, res) => {
  CustomerCare.find()
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      console.log(err);
    });
});

//updating data
router.route("/update/:id").put(async (req, res) => {
  let id = req.params.id;
  const { status } = req.body;

  const updateCustomerCare = {
    status,
  };

  const update = await CustomerCare.findByIdAndUpdate(id, updateCustomerCare)
    .then(() => {
      res.status(200).send({ status: "Inquiry updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message });
    });
});

//delete
router.route("/delete/:id").delete(async (req, res) => {
  let id = req.params.id;

  await CustomerCare.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send({ status: "Inquiry removed" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with removing inquiry", error: err.message });
    });
});

router.route("/get/:id").get((req, res) => {
  let id = req.params.id;

  CustomerCare.findById(id)
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
