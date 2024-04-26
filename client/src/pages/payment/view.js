import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../component/Header';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const View = () => {
  const [search, setSearch] = useState("");
  const [state, setState] = useState({
    order_placement: [],
    payment: []
  });

  useEffect(() => {
    axios.all([
      axios.get('http://localhost:8000/order_placement/'),
      axios.get('http://localhost:8000/payment/')
    ]).then(axios.spread((order_placementRes, paymentRes) => {
      setState({
        order_placement: order_placementRes.data,
        payment: paymentRes.data
      });
    }));
  }, []);

  const calculateRemainingCredit = (customerName) => {
    const totalCredit = state.order_placement
     .filter((order) => order.orderType === 'credit' && order.orderStatus === 'approved' && order.customerName === customerName)
     .reduce((acc, order) => acc + order.amount, 0);
      
    console.log('Total credit for', customerName, ':', totalCredit);
      
    const totalPaymentAmount = state.payment
     .filter((payment) => payment.CustomerName === customerName)
     .reduce((acc, payment) => acc + payment.Payment, 0);

    console.log('Total payment amount for', customerName, ':', totalPaymentAmount);
      
    return totalCredit - totalPaymentAmount;
  };

  const onDelete = (id) => {
    axios.delete(`http://localhost:8000/payment/delete/${id}`)
     .then((res) => {
        alert("Deleted successfully");
      })
  }

  const filteredOrders = state.order_placement.filter((order) => {
    return order.customerName.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <>
      <div className="col">
        <Header dashboard={"Customer Payment History System"} setSearch={setSearch} />
      </div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col py-3">
            {/* details */}
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Customer Name</th>
                  <th scope="col">Remaining credit</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders
                 .filter((order) => order.orderType === 'credit' && order.orderStatus === 'approved')
                 .map((order, index) => (
                    <tr key={index}>
                      <td>{order.customerName}</td>
                      <td>{calculateRemainingCredit(order.customerName)}</td>
                      <td>
                        <div className="d-grid gap-2">
                        <button type="button" class="btn btn-sm" style={{backgroundColor: "#596584 "}} >
                            <Link to={`/pages/payment/edit/${order._id}?customerName=${order.customerName}`} style={{ textDecoration: 'none', color: 'white' }}>
                              View
                            </Link>
                          </button>
                          <button type="button" className="btn btn-danger btn-sm" onClick={() => onDelete(order._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default View;