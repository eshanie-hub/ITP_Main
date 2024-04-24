import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../component/Header";

const EditCustomer = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    date: "",
    type: "",
    mail: "",
    message: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { status } = state;

    const data = {
      status: status,
    };

    axios
      .put(`http://localhost:8000/customercare/update/${params.id}`, data)
      .then((res) => {
        alert("Status updated successfully");
        navigate(-1);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/customercare/get/${params.id}`)
      .then((res) => {
        if (res.data) {
          setState({
            name: res.data.name,
            date: res.data.date,
            type: res.data.type,
            mail: res.data.mail,
            message: res.data.message,
            status: res.data.status,
          });
        }
      })
      .catch((error) => {
        console.error("Error fetching customer data:", error);
      });
  }, [params.id]);

  const openMailbox = () => {
    window.location.href = `mailto:${state.mail}`;
  };

  return (
    <>
      <div className="col">
        <Header dashboard={"Customer Care System"} />
      </div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col py-3">
            <div className="mt-5 mb-5 ">
              <h4>
                <span className="badge text-bg-secondary">
                  Update Customer Status
                </span>
              </h4>
            </div>
            <div className="row mb-5">
              <div className="col">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={state.name}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="col">
                <label className="form-label">Date</label>
                <input
                  type="text"
                  name="date"
                  className="form-control"
                  value={state.date}
                  onChange={handleChange}
                  disabled
                />
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <label className="form-label">Type</label>
                <input
                  type="text"
                  name="type"
                  className="form-control"
                  value={state.type}
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="col">
                <label className="form-label">Mail</label>
                <div className="d-flex align-items-center">
                  <button className="btn btn-light me-2" onClick={openMailbox}>
                    {state.mail}
                  </button>
                </div>
              </div>
              <div className="col">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="5"
                  id="comment"
                  name="message"
                  value={state.message}
                  onChange={handleChange}
                  disabled
                ></textarea>
              </div>
              <div className="col">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-control"
                  value={state.status}
                  onChange={handleChange}
                >
                  <option value="Pending">Pending</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Cancel">Cancel</option>
                </select>
              </div>
            </div>
            <button
              className="btn mt-5"
              style={{ background: "#c1b688" }}
              type="submit"
              onClick={onSubmit}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCustomer;
