import React, { useEffect, useState } from "react";
import Header from "../../component/Header";
import axios from "axios";

const View = () => {
  const [search, setSearch] = useState("");
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

  const formatMessage = (message) => {
    const words = message.split(" ");

    if (words.length <= 3) {
      return message;
    }

    const truncatedMessage = words.slice(0, 3).join(" ");
    return `${truncatedMessage} ...`;
  };

  const onDelete = (id) => {
    axios
      .delete(`http://localhost:8000/customercare/delete/${id}`)
      .then((res) => {
        alert("Deleted successfully");
      });
  };

  return (
    <>
      <div class="col">
        <Header dashboard={"Customer Care System"} setSearch={setSearch} />
      </div>
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col py-3">
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
                    return search.toLowerCase() === ""
                      ? customercare
                      : customercare.name.toLowerCase().includes(search);
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
                          <button type="button" class="btn btn-success btn-sm">
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
            <button className="btn btn-primary mt-5" type="submit">
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
