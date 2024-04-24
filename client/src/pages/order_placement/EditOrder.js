import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../component/Header';

const EditOrder = () => {
  const params = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState({
      customerName: "",
      distributorName: "",
      products: "",
      orderNo: "",
      orderType: "",
      amount: "",
      date: "",
      orderStatus: "",
      })
      const [errors, setErrors] = useState({});
      const [submitting, setSubmitting] = useState(false);

      const validateValues = (inputValues) => {
        let errors = {};
        if (inputValues.customerName.length < 4) {
          errors.customerName = "customerName is too short";
        }
        if (inputValues.distributorName.length < 1) {
          errors.distributorName = "distributorName is too short";
        }
        if (inputValues.products.length < 1) {
          errors.products = "products is too short";
        }
        if (inputValues.orderNo.length < 1) {
          errors.orderNo = "orderNo is too short";
        }
        if (inputValues.orderType.length < 1) {
          errors.orderType = "orderType is too short";
        }
        if (inputValues.amount.length < 1) {
          errors.amount = "amount is required";
        }
        if (inputValues.date.length < 1) {
          errors.date = "date is required";
        }
        if (inputValues.orderStatus.length < 1) {
          errors.orderStatus = "orderStatus is required";
        }
        return errors;
      };
    
      const handleChange = (e) =>{
        const {name, value} = e.target;
    
        setState({...state,[name]:value})
        setErrors(validateValues(state));
      }
    
      const onsubmit = (e) => {
        e.preventDefault();
        setErrors(validateValues(state));
        setSubmitting(true);
        if(Object.keys(errors).length === 0 && submitting){
        const 
        {
          customerName,
          distributorName,
          products,
          orderNo,
          orderType,
          amount,
          date,
          orderStatus
        } = state;
    
        const data = {
            
            customerName:customerName ,
            distributorName:distributorName ,
            products: products,
            orderNo: orderNo,
            orderType:orderType ,
            amount: amount,
            date: date,
            orderStatus:orderStatus ,
        }
        
        
    
        axios.put(`http://localhost:8000/order_placement/update/${params.id}`, data)
        .then((res) => {
          alert("Data submited successfully");
          navigate(-1);
        })
      }
        
      }
      
      useEffect(() => {
        axios.get(`http://localhost:8000/order_placement/get/${params.id}`).then((res) => {
          if(res.data){
            setState({
              customerName: res.data.customerName,
              distributorName: res.data.distributorName,
              products: res.data.products,
              orderNo: res.data.orderNo,
              orderType: res.data.orderType,
              amount: res.data.amount,
              date: res.data.date,
              orderStatus: res.data.orderStatus,
            })
            
          }
        })
      },[params.id]);
  return (
    <>
      <div class="col">
          <Header dashboard={"Order Placement System"} />
      </div>
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col py-3">
          <div class="mt-5 mb-5 ">
                <h4>
                    <span class="badge text-bg-secondary">
                    Order edit
                    </span>
                </h4>
            </div>
            <div class="row mb-5">
    <div class="col">
        <label class="form-label">customerName</label>
        <input 
        type="text"
        name="customerName" 
        className='form-control'
        placeholder="Enter customerName of the post"
        value={state.customerName}
        onChange={handleChange}
        />
        {errors.customerName && (
          <div class="text-danger mt-2">
            customerName should have 4 characters
          </div>)}
    </div>
    <div class="col-6">
    <label class="form-label">distributorName</label>
        <input 
        type="text"
        name="distributorName" 
        className='form-control'
        placeholder="Enter distributorName of the post"
        value={state.distributorName}
        onChange={handleChange}
        />
        {errors.distributorName && (
          <div class="text-danger mt-2">
            distributorName should have 4 characters
          </div>)}
    </div>
  </div>
  <div class="row mt-4">
  <div class="col">
    <label class="form-label">products</label>
        <input 
        type="text"
        name="products" 
        className='form-control'
        placeholder="Enter products of the post"
        value={state.products}
        onChange={handleChange}
        />
        {errors.preventDefault && (
          <div class="text-danger mt-2">
            products should have 4 characters
          </div>)}
    </div>
    <div class="col">
    <label class="form-label">orderNo</label>
        <input 
        type="text"
        name="orderNo" 
        className='form-control'
        placeholder="Enter orderNo of the post"
        value={state.orderNo}
        onChange={handleChange}
        />
        {errors.orderNo && (
          <div class="text-danger mt-2">
            orderNo should have 4 characters
          </div>)}
    </div>
    <div class="col">
    <label class="form-label">orderType</label>
        <input 
        type="text"
        name="orderType" 
        className='form-control'
        placeholder="Enter orderType of the post"
        value={state.orderType}
        onChange={handleChange}
        />
        {errors.orderType && (
          <div class="text-danger mt-2">
            orderType should have 4 characters
          </div>)}
    </div>
   
    <div class="col">
    <label class="form-label">amount</label>
        <input 
        type="text"
        name="amount" 
        className='form-control'
        placeholder="Enter amount of the post"
        value={state.amount}
        onChange={handleChange}
        />
        {errors.amount && (
          <div class="text-danger mt-2">
            amount can't be null
          </div>)}
    </div>
    <div class="col">
    <label class="form-label">date</label>
        <input 
        type="text"
        name="date" 
        className='form-control'
        placeholder="Enter date of the post"
        value={state.date}
        onChange={handleChange}
        />
        {errors.date && (
          <div class="text-danger mt-2">
            date can't be null
          </div>)}
    </div>
    <div class="col">
    <label class="form-label">orderStatus</label>
        <input 
        type="text"
        name="orderStatus" 
        className='form-control'
        placeholder="Enter orderStatus of the post"
        value={state.orderStatus}
        onChange={handleChange}
        />
        {errors.orderStatus && (
          <div class="text-danger mt-2">
            orderStatus can't be null
          </div>)}
    </div>


  <button className='btn mt-5' style={{backgroundColor: "#c1b688"}} type='submit' onClick={onsubmit}>
         Save
      </button>
</div>
            </div>
        </div>
      </div>
    </>
  )
}

export default EditOrder