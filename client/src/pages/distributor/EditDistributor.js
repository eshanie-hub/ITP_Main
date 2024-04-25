import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../component/Header';

const EditDistributor = () => {
  const params = useParams();
    const navigate = useNavigate();
    const [state, setState] = useState({
      distributorId: "",
      distributorName: "",
      phoneNo: "",
      creditLimit: "",
      agreementStatus: "",
      date: "",
      })
      const [errors, setErrors] = useState({});
      const [submitting, setSubmitting] = useState(false);
    
      const validateValues = (inputValues) => {
        let errors = {};
        if (inputValues.distributorId.length < 4) {
          errors.distributorId = "distributorID is too short";
        }
        if (inputValues.distributorName.length < 1) {
          errors.distributorName = "distributor name can't be null";
        }
        if (inputValues.creditLimit.length < 1) {
          errors.creditLimit = "credit Limit can't be null";
        }
        
        if (inputValues.phoneNo.length < 9) {
          errors.phoneNo = "not valid phone number";
        }
        if (inputValues.agreementStatus.length < 1) {
          errors.agreementStatus = "Agreement status can't be null";
        }
        if (!inputValues.date || inputValues.date.length < 1) {
          errors.date = "Date of birth is required";
        } else {
          // Validate if the date is in a valid format and a realistic date
          const doa = new Date(inputValues.date);
          const isValidDate = !isNaN(doa.getTime()); // Check if it's a valid date
          const isRealisticDate = doa <= new Date(); // Check if it's not a future date
      
          if (!isValidDate || !isRealisticDate) {
            errors.date = "Date of birth is required";
          }
        }
        return errors;
      };
    
    
      const handleChange = (e) =>{
        setState({ ...state, [e.target.name]: e.target.value });
        setErrors(validateValues(state));
      }
    
      const handleSubmit = (event) =>{
        event.preventDefault();
        setErrors(validateValues(state));
        setSubmitting(true);

        if(Object.keys(errors).length === 0 && submitting){
        const 
        {
          distributorId, 
          distributorName, 
          phoneNo,
          creditLimit,
          agreementStatus,
          date
        } = state;
    
        const data = {
          distributorId: distributorId,
            distributorName: distributorName,
            phoneNo: phoneNo,
            creditLimit: creditLimit,
            agreementStatus: agreementStatus,
            date: date
        }
        
        
    
        axios.put(`http://localhost:8000/distributor/update/${params.id}`, data)
        .then((res) => {
          alert("Data submited successfully");
          navigate(-1);
        })
      }
    }
      
      useEffect(() => {
        axios.get(`http://localhost:8000/distributor/get/${params.id}`).then((res) => {
          if(res.data){
            setState({
              distributorId: res.data.distributorId,
              distributorName: res.data.distributorName,
              phoneNo: res.data.phoneNo,
              creditLimit: res.data.creditLimit,
              agreementStatus: res.data.agreementStatus,
              date: res.data.date,
            })
            
          }
        })
      },[params.id]);
  return (
    <>
      <div class="col">
          <Header dashboard={"Distributor Management System"} />
      </div>
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col py-3">
          <div class="mt-5 mb-5 ">
                <h4>
                    <span class="badge text-bg-secondary">
                    Distributor Update 
                    </span>
                </h4>
            </div>

            <div class="row mb-5">
    <div class="col">
        <label class="form-label">distributorId</label>
        <input 
        type="text"
        name="distributorId" 
        className='form-control'
        placeholder="Enter distributorId of the post"
        value={state.distributorId}
        onChange={handleChange}
        />
        {errors.distributorId && (
          <div class="text-danger mt-2">
            distributorId should have 4 characters
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
            distributorName can't be null
          </div>
        )}
    </div>
  </div>
  <div class="row mt-4">
  <div class="col">
    <label class="form-label">phoneNo</label>
        <input 
        type="text"
        name="phoneNo" 
        className='form-control'
        placeholder="Enter phoneNo of the post"
        value={state.phoneNo}
        onChange={handleChange}
        />
        {errors.phoneNo && (
          <div class="text-danger mt-2">
            Phone number can't be null
          </div>
          )}

    </div>
    <div class="col">
    <label class="form-label">creditLimit</label>
        <input 
        type="text"
        name="creditLimit" 
        className='form-control'
        placeholder="Enter creditLimit of the post"
        value={state.creditLimit}
        onChange={handleChange}
        />
        {errors.creditLimit && (
          <div class="text-danger mt-2">
            credit limit can't be null
          </div>
          )}
    </div>
    
    <div className="col">
                <label className="form-label">agreementStatus</label>
                <input
                  name="agreementStatus"
                  className="form-control"
                  value={state.agreementStatus}
                  onChange={handleChange}
                />
                {errors.agreementStatus && (
                  <div class="text-danger mt-2">
                   Agreement status can't be null
                  </div>
                   )}
                  
              </div>
    <div class="col">
    <label class="form-label">date</label>
        <input 
        type="date"
        name="date" 
        className='form-control'
        placeholder="Enter date of the post"
        value={state.date}
        onChange={handleChange}
        />
        {errors.date && (
          <div class="text-danger mt-2">
            date can't be null
          </div>
          )}
    </div>

  <button className='btn  mt-5' style={{backgroundColor: "#c1b688 "}} type='submit' onClick={handleSubmit}>
         Save
      </button>
</div>
            </div>
        </div>
      </div>
    </>
  )
}

export default EditDistributor