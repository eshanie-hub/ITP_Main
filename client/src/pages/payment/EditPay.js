import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../component/Header';
import PropTypes from 'prop-types';
import { useLocation, useParams, Link, useNavigate } from 'react-router-dom';
import Payment_report from './Payment_report';

const EditPay = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const searchParams = new URLSearchParams(location.search);
  const customerName = searchParams.get('customerName');
  const [order_placement, setOrder_placement] = useState([]);
  const [payment, setPayment] = useState([]);
  const [totalFilteredCreditLimit, setTotalFilteredCreditLimit] = useState(0);
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
  const [remainingCredit, setRemainingCredit] = useState(0);
  useEffect(() => {
    axios.all([
      axios.get(`http://localhost:8000/order_placement/?customerName=${customerName}`),
      axios.get(`http://localhost:8000/payment/?customerName=${customerName}`)
    ]).then(axios.spread((order_placementRes, paymentRes) => {
      setOrder_placement(order_placementRes.data);
      setPayment(paymentRes.data);

      let totalFilteredCreditLimit = 0;
      const filteredOrderPlacement = order_placementRes.data.filter(order => order.orderType === 'credit' && order.orderStatus === 'approved');
      filteredOrderPlacement.forEach(item => {
        totalFilteredCreditLimit += item.amount;
      });

      setTotalFilteredCreditLimit(totalFilteredCreditLimit);

      // Calculate total payment for the relevant customer
      let totalPaymentAmount = 0;
      paymentRes.data.filter(payment => payment.CustomerName === customerName)
        .filter(payment => search.toLowerCase() === '' || payment.CustomerName.toLowerCase().includes(search))
        .forEach(item => {
          totalPaymentAmount += item.Payment;
        });

      setTotalPaymentAmount(totalPaymentAmount);
      setRemainingCredit(totalFilteredCreditLimit - totalPaymentAmount);
    }));
  }, [customerName, search]);

  // Calculate total credit for the relevant customer
  useEffect(() => {
    const totalCredit = order_placement
      .filter(order => order.customerName === customerName)
      .reduce((acc, order) => acc + order.amount, 0);
    setTotalFilteredCreditLimit(totalCredit);
  }, [order_placement, customerName]);

  useEffect(() => {
    setRemainingCredit(totalFilteredCreditLimit - totalPaymentAmount);
  }, [totalFilteredCreditLimit, totalPaymentAmount]);

  return (
    <>
      <div className="col">
        <Header dashboard={"Payment history Management System"} />
      </div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col py-3">
            <div className="mt-5 mb-5 ">
              <h5>Customer Name: {customerName}</h5>
            </div>
            <div className="container">
              <div className="row">
                <div className="col-8 ">
                
                  <div className='card mt-5' style={{ width: '600px' }}>
                    <div className="card-header ">
                      <h4>Credit Table</h4>
                    </div>
                    <table name="Credit table" className="table table-striped">
                      <thead>
                        <tr>
                          <th>OrderNo</th>
                          <th>Date</th>
                          <th>Credit Limit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order_placement
                          .filter(order => order.customerName === customerName)
                          .map((order, index) => (
                            <tr key={index}>
                              <td>{order.orderNo}</td>
                              <td>{order.date}</td>
                              <td>{order.amount}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
              
                  <div className='card mt-5' style={{ width: '600px' }}>
                    <div className="card-header">
                      <h4>Payment Table<Link to={`/pages/payment/add/${params.id}`} style={{ backgroundColor: "#c1b688" }} className="btn  float-end  ">Add payment</Link></h4>
                    </div>
                    <table name="payment table" className="table table-striped"  >
                      <thead>
                        <tr>
                          <th>OrderNo</th>
                          <th>PaymentId</th>
                          <th>Date</th>
                          <th>Payment</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payment.filter(payment => payment.CustomerName === customerName)
                          .filter(payment => search.toLowerCase() === '' || payment.CustomerName.toLowerCase().includes(search))
                          .map((payment, index) => (
                            <tr key={index}>
                              <td>{payment.OrderNo}</td>
                              <td>{payment.PaymentId}</td>
                              <td>{payment.Date}</td>
                              <td>{payment.Payment}</td>
                              <td>
                                <button type="button" className="btn btn-sm" style={{ backgroundColor: "#596584 " }} >
                                  <Link to={`/pages/payment/update/${payment._id}`} style={{ textDecoration: 'none', color: 'white' }}>
                                    Update
                                  </Link>
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-2">
                  <div className="card mt-5 p-3" style={{ width: '300px' }}>
                    <h4 className="card-title">Payment Summary</h4>
                    <div className="card-body">
                      <div className="d-flex justify-content-between mb-3">
                        <h6>Total credit limit :</h6>
                        <p>{totalFilteredCreditLimit}</p>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <h6>Total payment amount:</h6>
                        <p>{totalPaymentAmount}</p>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <h6>Remaining credit limit:</h6>
                        <p>{remainingCredit}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

EditPay.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EditPay;
