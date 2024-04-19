import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../component/Header';

const EditDelivery = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    SalesExecutiveName: "",
      OperatorName: "",
      OrderNo: "",
      Amount: "",
      DeliveryStatus: "",
    })
  
    const [errors, setErrors] = useState({});
      const [submitting, setSubmitting] = useState(false);

      const validateValues = (inputValues) => {
        let errors = {};
        if (inputValues.SalesExecutiveName.length < 4) {
          errors.SalesExecutiveName = "Sales executive name is too short";
        }
        if (inputValues.OperatorName.length < 1) {
          errors.OperatorName = "Operator Name is too short";
        }
        if (inputValues.OrderNo.length < 1) {
          errors.OrderNo = "orderNo is too short";
        }
        if (inputValues.Amount.length < 1) {
          errors.Amount = "amount is too short";
        }
        if (inputValues.DeliveryStatus.length < 1) {
          errors.DeliveryStatus = "status is too short";
        }
       
        return errors;
      };
    const handleChange = (e) =>{
      const {name, value} = e.target;
      let newValue = value;

// Perform specific validations based on the input field
if (name === "SalesExecutiveName" || name === "OperatorName" || name === "DeliveryStatus") {
  // Allow only alphabetic characters
  newValue = value.replace(/[^A-Za-z]/ig, "");
} else if (name === "OrderNo" || name === "Amount") {
  // Allow only integers
  newValue = value.replace(/\D/g, "");
}

      //setState({...state,[e.target.name]:e.target.value});
      setState({...state, [name]: newValue});
setErrors(validateValues({...state, [name]: newValue}));
}
  
    const onsubmit = (e) => {
      e.preventDefault();
      setErrors(validateValues(state));
        setSubmitting(true);
  
      const 
      {
        SalesExecutiveName,
        OperatorName,
        OrderNo,
        Amount,
        DeliveryStatus
      } = state;
  
      const data = {
        SalesExecutiveName: SalesExecutiveName,
        OperatorName: OperatorName,
        OrderNo: OrderNo,
        Amount: Amount,
        DeliveryStatus: DeliveryStatus,
        
      }
      
      
  
      axios.put(`http://localhost:8000/delievery/update/${params.id}`, data)
      .then((res) => {
        alert("Data submited successfully");
        navigate(-1);
      })
    }
    
    useEffect(() => {
      axios.get(`http://localhost:8000/delievery/get/${params.id}`).then((res) => {
        if(res.data){
          setState({
            SalesExecutiveName: res.data.SalesExecutiveName,
            OperatorName: res.data.OperatorName,
            OrderNo: res.data.OrderNo,
            Amount: res.data.Amount,
            DeliveryStatus: res.data.DeliveryStatus,
            
          })
          
        }
      })
    },[params.id]);
  return (
    <>
    <div class="col">
        <Header dashboard={"Delivery Management System"}/>
    </div>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col py-3">
            <div class="mt-5 mb-5 ">
                <h4>
                    <span class="badge text-bg-secondary">
                    Delivery Add 
                    </span>
                </h4>
            </div>
          
          <div class="row mb-5">
    <div class="col">
        <label class="form-label">SalesExecutiveName</label>
        <input 
        type="text"
        name="SalesExecutiveName" 
        className='form-control'
        placeholder="Enter name"
        value={state.SalesExecutiveName}
        onChange={handleChange}
        />
        {errors.SalesExecutiveName && (
          <div class="text-danger mt-2">
            SalesExecutiveName should have 4 characters
          </div>)}
    </div>
    <div class="col-6">
    <label class="form-label">OperatorName</label>
        <input 
        type="text"
        name="OperatorName" 
        className='form-control'
        placeholder="Enter name"
        value={state.OperatorName}
        onChange={handleChange}
        />
        {errors.OperatorName && (
          <div class="text-danger mt-2">
            OperatorName should have 4 characters
          </div>)}
    </div>
  </div>
  <div class="row mt-4">
  <div class="col">
    <label class="form-label">OrderNo</label>
        <input 
        type="text"
        name="OrderNo" 
        className='form-control'
        placeholder="Enter number"
        value={state.OrderNo}
        onChange={handleChange}
        />
        {errors.OrderNo && (
          <div class="text-danger mt-2">
            orderNo should have 4 characters
          </div>)}
    </div>
    <div class="col">
    <label class="form-label">Amount</label>
        <input 
        type="text"
        name="Amount" 
        className='form-control'
        placeholder="Enter amount"
        value={state.Amount}
        onChange={handleChange}
        />
        {errors.Amount && (
          <div class="text-danger mt-2">
            Amount should have 4 characters
          </div>)}
    </div>
    <div class="col">
    <label class="form-label">DeliveryStatus</label>
        <input 
        type="text"
        name="DeliveryStatus" 
        className='form-control'
        placeholder="Pending"
        value={state.DeliveryStatus}
        onChange={handleChange}
        />
        {errors.DeliveryStatus && (
          <div class="text-danger mt-2">
            Status should have 4 characters
          </div>)}
    </div>
    

  <button className='btn btn-success mt-5' type='submit' onClick={onsubmit}>
         Save
      </button>
      </div>
      </div>
    </div>
    </div>
  </>

  )
}

export default EditDelivery