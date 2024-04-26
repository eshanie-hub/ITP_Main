import React, { useState, useEffect } from 'react';
import Header from '../../component/Header';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AddPay = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, setState] = useState({
    OrderNo: "",
    PaymentId: "",
    Date: "",
    Payment: "",
    CustomerName: "" 
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [order_placement, setOrder_placement] = useState([]);
  const [totalFilteredCreditLimit, setTotalFilteredCreditLimit] = useState(0);
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
  const [remainingCredit, setRemainingCredit] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/order_placement/get/${id}`);
        const orderData = response.data;
        setState(prevState => ({
          ...prevState,
          OrderNo: orderData.orderNo,
          CustomerName: orderData.customerName
        }));
      } catch (error) {
        console.error('Error fetching order data: ', error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    axios.get(`http://localhost:8000/order_placement/?customerName=${state.CustomerName}`)
      .then(response => {
        setOrder_placement(response.data);
        let totalFilteredCreditLimit = 0;
        const filteredOrderPlacement = response.data.filter(order => order.orderType === 'credit' && order.orderStatus === 'approved');
        filteredOrderPlacement.forEach(item => {
          totalFilteredCreditLimit += item.amount;
        });
        setTotalFilteredCreditLimit(totalFilteredCreditLimit);
      })
      .catch(error => {
        console.error('Error fetching order placement data: ', error);
      });
  }, [state.CustomerName]);

  useEffect(() => {
    setRemainingCredit(totalFilteredCreditLimit - totalPaymentAmount);
  }, [totalFilteredCreditLimit, totalPaymentAmount]);

  const validateValues = (inputValues) => {
    let errors = {};
    if (inputValues.OrderNo.length < 3) {
      errors.OrderNo = "OrderNo is too short";
    }
    if (inputValues.PaymentId.length < 4) {
      errors.PaymentId = "PaymentId is too short";
    }
    if (inputValues.Date.length < 1) {
      errors.Date = "Date is too short";
    }
    if (inputValues.Payment.length < 1) {
      errors.Payment = "Payment is too short";
    }

    return errors;
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setErrors(validateValues({ ...state, [e.target.name]: e.target.value }));
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validateValues(state);
    setErrors(validationErrors);
    console.log('Validation errors:', validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      console.log('Submitting form...');
      const data = {
        OrderNo: state.OrderNo,
        PaymentId: state.PaymentId,
        Date: state.Date,
        Payment: state.Payment,
        CustomerName: state.CustomerName,
        RemainingCredit: remainingCredit - state.Payment  
      };
  
      // Send the data to the server
      axios.post("http://localhost:8000/payment/add", data)
        .then((res) => {
          alert("Payment added successfully");
          navigate(`/pages/payment/edit/${id}?customerName=${state.CustomerName}`);
        })
        .catch((error) => {
          console.error('Error adding payment: ', error);
        });
    } else {
      console.log('Form not submitted due to validation errors...');
    }
  }

  return (
    <>
      <div className="col">
        <Header dashboard={"Payment history Management System"} />
      </div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col py-3">
            <div className="mt-5 mb-5 ">
              <h4>
                <span className="badge text-bg-secondary">
                  Payment Add
                </span>
              </h4>
            </div>

            <div>
              <form onSubmit={handleSubmit}>
                <div className="row mb-5">
                  <div className="col">
                    <label className="form-label">OrderNo</label>
                    <input
                      type="text"
                      name="OrderNo"
                      className='form-control'
                      placeholder="Enter OrderNo of the post"
                      value={state.OrderNo}
                      onChange={handleChange}
                    />
                    {errors.OrderNo && (
                      <div className="text-danger mt-2">
                        {errors.OrderNo}
                      </div>)}
                  </div>

                  <div className="col-6">
                    <label className="form-label">PaymentId</label>
                    <input
                      type="text"
                      name="PaymentId"
                      className='form-control'
                      placeholder="Enter PaymentId of the post"
                      value={state.PaymentId}
                      onChange={handleChange}
                    />
                    {errors.PaymentId && (
                      <div className="text-danger mt-2">
                        {errors.PaymentId}
                      </div>
                    )}
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col">
                    <label className="form-label">Date</label>
                    <input
                      type="text"
                      name="Date"
                      className='form-control'
                      placeholder="Enter Date of the post"
                      value={state.Date}
                      onChange={handleChange}
                    />
                    {errors.Date && (
                      <div className="text-danger mt-2">
                        {errors.Date}
                      </div>
                    )}
                  </div>
                </div>

                <div className="row mt-4">
                  <div className="col">
                    <label className="form-label">Payment</label>
                    <input
                      type="text"
                      name="Payment"
                      className='form-control'
                      placeholder="Enter Payment of the post"
                      value={state.Payment}
                      onChange={handleChange}
                    />
                    {errors.Payment && (
                      <div className="text-danger mt-2">
                        {errors.Payment}
                      </div>
                    )}
                  </div>
                </div>

                <button 
                  className='btn  mt-5' style={{backgroundColor:"#c1b688"}}
                  type='submit'
                  disabled={submitting}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddPay;
