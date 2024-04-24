import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';
import axios from 'axios';

const SalesExecutive_view = () => {
  const [state, setState] = useState({
    order_placement: []
  });

  useEffect(() => {
    axios.get("http://localhost:8000/order_placement/").then(res => {
      if (res.data) {
        setState({
          order_placement: res.data
        });
      }
    });
  }, []);

  const onDelete = (id) => {
    axios.delete(`http://localhost:8000/order_placement/delete/${id}`)
      .then((res) => {
        alert("Deleted successfully");
      });
  };

  const [search, setSearch] = useState("");
    // console.log(search);

  const message = state.order_placement.map((order_placement, index) => {
    if (order_placement.amount > 100000) { 
      return (
        <div className="alert alert-danger mb-5" role="alert" key={index}>
          <span>Customer name: <b>{order_placement.customerName}</b> has an order amount over $100,000!</span>
        </div>
      )
    }
    return null;
  });

  return (
    <>
      <div className="col">
        <Header dashboard={"Order Placement System"} setSearch={setSearch} />
      </div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col py-3">
            {/* details */}
            {message}
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">customerName</th>
                  <th scope="col">distributorName</th>
                  <th scope="col">products</th>
                  <th scope="col">orderNo</th>
                  <th scope="col">orderType</th>
                  <th scope="col">amount</th>
                  <th scope="col">date</th>
                  <th scope="col">orderStatus</th>
                </tr>
              </thead>
              <tbody>
                {state.order_placement
                  .filter((order_placement) => {
                    return search.toLowerCase() === '' ? order_placement : order_placement.customerName.toLowerCase().includes(search);
                  })
                  .map((order_placement, index) => (
                    <tr key={index}>
                      <td>{order_placement.customerName}</td>
                      <td>{order_placement.distributorName}</td>
                      <td>{order_placement.products}</td>
                      <td>{order_placement.orderNo}</td>
                      <td>{order_placement.orderType}</td>
                      <td>{order_placement.amount}</td>
                      <td>{order_placement.date}</td>
                      <td>{order_placement.orderStatus}</td>
                      <td>
                        <div className="d-grid gap-2">
                        <button type="button" class="btn btn-sm" style={{backgroundColor: "#596584 "}} >
                            <a href={`/pages/order_placement/edit/${order_placement._id}`} style={{ textDecoration: 'none', color: 'white' }}>
                              update
                            </a>
                          </button>
                          <button type="button" className="btn btn-danger btn-sm" onClick={() => onDelete(order_placement._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button className='btn btn-primary'>
              <a href="/pages/order_placement/add" style={{ textDecoration: 'none', color: 'white' }}>
                create new Item
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesExecutive_view;
