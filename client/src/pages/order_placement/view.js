import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';
import axios from 'axios';

const View = () => {
  const [search, setSearch] = useState("");
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

  return (
    <>
      <div className="col">
        <Header dashboard={"Order Placement System"} setSearch={setSearch} />
      </div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col py-3">
            {/* details */}
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
                {state.order_placement.filter(order_placement => order_placement.orderStatus === 'approved' && 
                  (search.toLowerCase() === '' || order_placement.customerName.toLowerCase().includes(search))
                ).map((order_placement, index) => (
                  <tr key={index}>
                    <td>{order_placement.customerName}</td>
                    <td>{order_placement.distributorName}</td>
                    <td>{order_placement.products}</td>
                    <td>{order_placement.orderNo}</td>
                    <td>{order_placement.orderType}</td>
                    <td>{order_placement.amount}</td>
                    <td>{order_placement.date}</td>
                    <td>{order_placement.orderStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default View;
