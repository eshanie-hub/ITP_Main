import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../component/Header';


export const UpdatePay = () => {
  const params = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState({
      OrderNo: "",
      PaymentId: "",
      Date: "",
      CustomerName: "",
      Payment: ""
        
      })
    const [errors, setErrors]=useState({});
    const[submitting, setSubmitting]=useState(false);

    const validateValues=(inputValues)=>{
      let errors={};
      if (inputValues.OrderNo.length<3) {
        errors.OrderNo="orderNo is too short";
      }
       if (inputValues.PaymentId.length<1) {
          errors.PaymentId="PaymentId is too short";
        }
        if (inputValues.Date.length<1) {
          errors.Date="Date is too short";
        }
        if (inputValues.CustomerName.length<1) {
          errors.CustomerName="CustomerName is too short";
        }
        if (inputValues.Payment.length<1) {
          errors.Payment="Payment is too short";
        }
        return errors;
    };
      const handleChange = (e) =>{
       setState({...state,[e.target.name]:e.target.value});
      setErrors(validateValues(state));
      }
    
      const handleSubmit=(event)=>{
        event.preventDefault();
        setErrors(validateValues(state));
        setSubmitting(true);

        if(Object.keys(errors).length===0 && submitting){
          const 
        {
            OrderNo, 
            PaymentId, 
            Date,
            CustomerName,
            Payment
            
        } = state;
    
        const data = {
          OrderNo: OrderNo,
          PaymentId: PaymentId,
          Date: Date,
          CustomerName: CustomerName,
          Payment: Payment
            
        }
      
      
        
    
        axios.put(`http://localhost:8000/payment/update/${params.id}`, data)
        .then((res) => {
          alert("Data updated successfully");
          navigate(-1);
        })
      }
    }
      useEffect(() => {
        axios.get(`http://localhost:8000/payment/get/${params.id}`).then((res) => {
          if(res.data){
            setState({
              OrderNo: res.data.OrderNo,
              PaymentId: res.data.PaymentId,
              Date: res.data.Date,
              CustomerName: res.data.CustomerName,
              Payment: res.data.Payment,
              })
            
          }
        })
      },[params.id]);

  return (
    <>
    <div class="col">
        <Header dashboard={"Payment history Management System"} />
    </div>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col py-3">
            <div class="mt-5 mb-5 ">
                <h4>
                    <span class="badge text-bg-secondary">
                    Payment Add 
                    </span>
                </h4>
            </div>
          

  <div class="row mb-5">
    <div class="col">
        <label class="form-label">OrderNo</label>
        <input 
        type="text"
        name="OrderNo" 
        className='form-control'
        placeholder="Enter OrderNo of the post"
        value={state.OrderNo}
        onChange={handleChange}
        />
        {errors.OrderNo && (
          <div class="text-danger mt-2">
            OrderNo should have 4 characters
       </div> )}
    </div>
    <div class="col-6">
    <label class="form-label">PaymentId</label>
        <input 
        type="text"
        name="PaymentId" 
        className='form-control'
        placeholder="Enter Payment id no of the post"
        value={state.PaymentId}
        onChange={handleChange}
        />
        {errors.PaymentId && (
          <div class="text-danger mt-2">
            PaymentId should have 4 characters
       </div> )}
    </div>
  </div>
  <div class="row mt-4">
  <div class="col">
    <label class="form-label">Date</label>
        <input 
        type="text"
        name="Date" 
        className='form-control'
        placeholder="Enter date of the post"
        value={state.Date}
        onChange={handleChange}
        />
        {errors.Date && (
          <div class="text-danger mt-2">
            Date can't be null
       </div> )}
    </div>
    </div>
    <div class="row mt-4">
    <div class="col">
    <label class="form-label">CustomerName</label>
        <input 
        type="text"
        name="CustomerName" 
        className='form-control'
        placeholder="Enter Customer name of the post"
        value={state.CustomerName}
        onChange={handleChange}
        />
        {errors.CustomerName && (
          <div class="text-danger mt-2">
            CustomerName can't be null
       </div> )}
    </div>
    <div class="col">
    <label class="form-label">Payment</label>
        <input 
        type="text"
        name="Payment" 
        className='form-control'
        placeholder="Enter payment of the post"
        value={state.Payment}
        onChange={handleChange}
        />
         {errors.Payment && (
          <div class="text-danger mt-2">
            Payment can't be null
       </div> )}
    </div>
    
    <button className='btn mt-5' style={{backgroundColor: "#c1b688 "}} type='submit' onClick={handleSubmit}>
         Save
      </button>
</div>

          </div>
      </div>
    </div>
  </>
  )
}

export default UpdatePay;