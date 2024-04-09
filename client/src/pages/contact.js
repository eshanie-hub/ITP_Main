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

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
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
    <div className="container ">
      <form className="row g-1 ">
        <h1>Contact</h1>
        <div>
          <div className="col-md-5">
            <label className="form-label">Customer Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Name"
              value={state.name}
              onChange={handleChange}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
        </div>

        <div>
          <div className="col-md-5">
            <label className="form-label">Type</label>
            <select
              name="type"
              className="form-control"
              value={state.type}
              onChange={handleChange}
            >
              <option selected>Select Feedback type</option>
              <option value="Production">Production</option>
              <option value="Staff">Staff</option>
              <option value="Delivery">Delivery</option>
              <option value="Other">Other</option>
            </select>
            {errors.type && <div className="text-danger">{errors.type}</div>}
          </div>
        </div>

        <div>
          <div className="col-md-5">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="mail"
              className="form-control"
              placeholder="email"
              required
              value={state.mail}
              onChange={handleChange}
            />
            {errors.mail && <div className="text-danger">{errors.mail}</div>}
          </div>
        </div>

        <div>
          <div className="col-md-5">
            <label className="form-label">Message</label>
            <textarea
              className="form-control"
              rows="5"
              id="comment"
              name="message"
              value={state.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && (
              <div className="text-danger">{errors.message}</div>
            )}
          </div>
        </div>

        <div>
          <button
            className="btn btn-success mt-4 col-md-4"
            type="submit"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
