import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [state, setState] = useState({
    name: "",
    type: "",
    mail: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let errors = {};

    if (!state.name.trim()) {
      errors.name = "Name is required";
    }

    if (state.type === "") {
      errors.type = "Please select a type";
    }

    if (!state.mail.trim()) {
      errors.mail = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(state.mail)) {
      errors.mail = "Email is invalid";
    }

    if (!state.message.trim()) {
      errors.message = "Message is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const { name, type, mail, message } = state;

      function formatDate(date) {
        const year = date.toLocaleString("default", { year: "numeric" });
        const month = date.toLocaleString("default", {
          month: "2-digit",
        });
        const day = date.toLocaleString("default", { day: "2-digit" });

        return [year, month, day].join("-");
      }

      const data = {
        name: name,
        date: formatDate(new Date()),
        type: type,
        mail: mail,
        message: message,
      };
      console.log(data);

      axios.post("http://localhost:8000/customercare/add", data).then((res) => {
        if (res.data) {
          setState({
            name: "",
            type: "",
            mail: "",
            message: "",
          });
          alert("Feedback sent");
        }
      });
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <div>
      <div
        className="bg-background"
        style={{ backgroundColor: "#f8f9fa" }}
      ></div>
      <div className="container py-5">
        <div className="row py-5 g-3">
          <div
            className="col-md-6 "
            style={{
              backgroundColor: "white",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              position: "relative",
              width: "550px",
              left: "155px",
              top: "100px",
              borderRadius: "20px",
              paddingBottom: "10px",
            }}
          >
            <h1 className="text-center mt-3">Contact Us</h1>
            <form
              className="p-4 mt-3"
              style={{
                background: "#fff",
                fontSize: "14px",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <div className="mb-3">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  value={state.name}
                  onChange={handleChange}
                  style={{
                    borderRadius: "2px",
                    border: state.name
                      ? "2px solid #596584"
                      : "2px solid #c1b688",
                  }}
                />
                {errors.name && (
                  <div className="text-danger">{errors.name}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Type</label>
                <select
                  name="type"
                  className="form-control"
                  value={state.type}
                  onChange={handleChange}
                  style={{
                    borderRadius: "2px",
                    border: state.type
                      ? "2px solid #596584"
                      : "2px solid #c1b688",
                  }}
                >
                  <option selected>Select Feedback type</option>
                  <option value="Production">Production</option>
                  <option value="Staff">Staff</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Other">Other</option>
                </select>
                {errors.type && (
                  <div className="text-danger">{errors.type}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="mail"
                  className="form-control"
                  placeholder="email"
                  required
                  value={state.mail}
                  onChange={handleChange}
                  style={{
                    borderRadius: "2px",
                    border: state.mail
                      ? "2px solid #596584"
                      : "2px solid #c1b688",
                  }}
                />
                {errors.mail && (
                  <div className="text-danger">{errors.mail}</div>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="5"
                  id="comment"
                  name="message"
                  value={state.message}
                  onChange={handleChange}
                  style={{
                    borderRadius: "2px",
                    border: state.message
                      ? "2px solid #596584"
                      : "2px solid #c1b688",
                  }}
                ></textarea>
                {errors.message && (
                  <div className="text-danger">{errors.message}</div>
                )}
              </div>
              <div className="mb-3">
                <button
                  className="btn btn-primary"
                  style={{ backgroundColor: "#596584" }}
                  type="submit"
                  onClick={handleSubmit}
                >
                  Send Now
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <img
              src={require("../assets/contact.jpg")}
              style={{ borderRadius: "20px", width: "100%" }}
              alt="Contact"
            />
          </div>
        </div>

        <div
          className="row"
          style={{
            position: "relative",
            top: "100px",
            paddingLeft: "20px",
            paddingBottom: "10px",
            marginBottom: "10px",
            backgroundColor: "#c1b688",
            borderRadius: "20px",
          }}
        >
          <div className="row  p-3">
            <div className="col-3">
              <h4>CALL US</h4>
              <p>+94 764 409 693</p>
            </div>
            <div className="col">
              <h4>LOCATION</h4>
              <p>No 190/1,Werahara,Boralesgamuwa.</p>
            </div>
            <div className="col">
              <h4>Email</h4>
              <p>info@vidmaengineer.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
