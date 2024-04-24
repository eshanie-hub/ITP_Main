import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import axios from "axios";

const View = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [state, setState] = useState({
    customercare: [],
  });

  useEffect(() => {
    axios.get("http://localhost:8000/customercare/").then((res) => {
      if (res.data) {
        setState({
          customercare: res.data,
        });
      }
    });
  }, [state]);

  const pendingInquiriesCount = state.customercare.filter(
    (inquiry) => inquiry.status === "Pending"
  ).length;

  const formatMessage = (message) => {
    const words = message.split(" ");

    if (words.length <= 3) {
      return message;
    }

    const truncatedMessage = words.slice(0, 3).join(" ");
    return `${truncatedMessage} ...`;
  };

  const onDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this inquiry?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8000/customercare/delete/${id}`)
        .then((res) => {
          alert("Deleted successfully");
          // Optionally, you can update the state after deletion
          setState((prevState) => ({
            customercare: prevState.customercare.filter(
              (item) => item._id !== id
            ),
          }));
        })
        .catch((error) => {
          console.error("Error deleting inquiry:", error);
          alert("Failed to delete inquiry");
        });
    }
  };

  //report
  return (
    <>
      <div class="col">
        <Header dashboard={"Customer Care System"} setSearch={setSearch} />
        {pendingInquiriesCount > 0 && (
          <div
            className="alert alert-info mt-3"
            style={{ backgroundColor: "#c1b688 " }}
            role="alert"
          >
            You have {pendingInquiriesCount} pending inquiries to resolve..
          </div>
        )}
      </div>
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col py-3">
            <div className="row mb-5">
              <div className="col">
                <label htmlFor="typeFilter" className="form-label">
                  Filter by Type:
                </label>
                <select
                  id="typeFilter"
                  className="form-select"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Production">Production</option>
                  <option value="Staff">Staff</option>
                  <option value="Delivery">Delivery</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="col">
                <label htmlFor="typeDate" className="form-label">
                  Filter by Date:
                </label>
                <input
                  id="typeDate"
                  type="date"
                  name="date"
                  className="form-control"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </div>
            </div>

            <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Type</th>
                  <th scope="col">Email</th>
                  <th scope="col">Message</th>
                  <th scope="col">Feedback Status</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {state.customercare
                  .filter((customercare) => {
                    // Filter based on search query and selected type
                    return (
                      (search.trim() === "" ||
                        customercare.name
                          .toLowerCase()
                          .includes(search.toLowerCase())) &&
                      (typeFilter === "" || customercare.type === typeFilter) &&
                      (dateFilter === customercare.date || dateFilter === "")
                    );
                  })
                  .map((customercare, index) => (
                    <tr key={index}>
                      <td>{customercare.name}</td>
                      <td>{customercare.date}</td>
                      <td>{customercare.type}</td>
                      <td>{customercare.mail}</td>
                      <td>{formatMessage(customercare.message)}</td>
                      <td>{customercare.status}</td>
                      <td>
                        <div class="d-grid gap-2">
                          <button
                            type="button"
                            class="btn btn-sm"
                            style={{ backgroundColor: "#596584 " }}
                          >
                            <a
                              href={`/pages/customer/edit/${customercare._id}`}
                              style={{ textDecoration: "none", color: "white" }}
                            >
                              update
                            </a>
                          </button>
                          <button
                            type="button"
                            class="btn btn-danger btn-sm"
                            onClick={() => onDelete(customercare._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button
              className="btn mt-5"
              style={{ background: "#c1b688" }}
              type="submit"
            >
              <a
                href="./report"
                style={{ textDecoration: "none", color: "white" }}
              >
                Report
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
