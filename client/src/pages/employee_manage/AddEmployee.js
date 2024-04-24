import React, { useState } from 'react'
import Header from '../../component/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const navigate = useNavigate();
  
    const [state, setState] = useState({
      empID:"", 
      name:"", 
      dateOfBirth:"",
      address:"",
      contactNumber:"",
      position:"",
      department:"",
      joinedDate:"",
      })

      const [errors, setErrors] = useState({});
      const [submitting, setSubmitting] = useState(false);
    
      const validateValues = (inputValues) => {
        let errors = {};
        if (inputValues.empID.length < 6) {
          errors.empID = "EmpID should have 6 characters";
        }
        const nameLetter =/^[A-Za-z]+$/
        if (!nameLetter.test(inputValues.name)) {
          errors.name = "Emp Name must contain only letters";
        }
        if (!inputValues.dateOfBirth || inputValues.dateOfBirth.length < 1) {
          errors.dateOfBirth = "Date of birth is required";
        } else {
          // Validate if the date is in a valid format and a realistic date
          const dob = new Date(inputValues.dateOfBirth);
          const isValidDate = !isNaN(dob.getTime()); // Check if it's a valid date
          const isRealisticDate = dob <= new Date(); // Check if it's not a future date
      
          if (!isValidDate || !isRealisticDate) {
            errors.dateOfBirth = "Date of birth is required";
          }
        }
        if (inputValues.address.length < 5) {
          errors.address = "Please enter a valid address";
        }
        if (!/^(0|[1-9])[0-9]{9}$/.test(inputValues.contactNumber)){
          errors.contactNumber = "Contact Number should be 10 digits";
        }
        const positionLetter =/^[A-Za-z]+$/
        if (!positionLetter.test(inputValues.position)) {
          errors.position = "Position must contain only letters";
        }
        const deptLetter =/^[A-Za-z]+$/
        if (!deptLetter.test(inputValues.department)) {
          errors.department = "Department must contain only letters";
        }
        if (!inputValues.joinedDate || inputValues.joinedDate.length < 1) {
          errors.joinedDate = "Joined date is required";
        } else {
          // Validate if the date is in a valid format and a realistic date
          const joinedDate = new Date(inputValues.joinedDate);
          const isValidJoinedDate = !isNaN(joinedDate.getTime()); // Check if it's a valid date
          const isRealisticJoinedDate = joinedDate <= new Date(); // Check if it's not a future date
      
          if (!isValidJoinedDate || !isRealisticJoinedDate) {
            errors.joinedDate = "Invalid Joined Date";
          }
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
          empID, 
            name, 
            dateOfBirth,
            address,
            contactNumber,
            position,
            department,
            joinedDate
        } = state;
    
        const data = {
          empID:empID, 
          name:name, 
          dateOfBirth:dateOfBirth,
          address:address,
          contactNumber:contactNumber,
          position:position,
          department:department,
          joinedDate:joinedDate,
        }
        console.log(data);
    
        axios.post("http://localhost:8000/empDetails/add", data)
        .then((res) => {
          alert("Employee Details added Successfully");
          navigate(-1);
        })
      }

    }
  return (
    <>
    <div class="col">
        <Header dashboard={"Employee Management System"} />
    </div>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col py-3">
            <div class="mt-5 mb-5 ">
                <h4>
                    <span class="badge text-bg-secondary">
                    Add Employee
                    </span>
                </h4>
            </div>
            {/* table */}
            <div class="row mb-5">
    <div class="col">
        <label class="form-label">EmpID</label>
        <input 
        type="text"
        name="empID" 
        className='form-control'
        placeholder="Enter EmpNo of the employee"
        value={state.empID}
        onChange={handleChange}
        />
        {errors.empID && (
          <div class="text-danger mt-2">
            EmpID should have 6 characters
          </div>
          )}
    </div>
    <div class="col-6">
    <label class="form-label">Name</label>
        <input 
        type="text"
        name="name" 
        className='form-control'
        placeholder="Enter Name of the employee"
        value={state.name}
        onChange={handleChange}
        />
        {errors.name && (
          <div class="text-danger mt-2">
            Name must contain only letters
          </div>
          )}
    </div>
  </div>
  <div class="row mt-4">
  <div class="col">
    <label class="form-label">Date Of Birth</label>
        <input 
        type="date"
        name="dateOfBirth" 
        className='form-control'
        placeholder="Enter dateOfBirth of the employee"
        value={state.dateOfBirth}
        onChange={handleChange}
        />
         {errors.dateOfBirth && (
          <div class="text-danger mt-2">
            Date of birth is required
          </div>
          )}
    </div>
    <div class="col">
    <label class="form-label">Address</label>
        <input 
        type="text"
        name="address" 
        className='form-control'
        placeholder="Enter Address of the employee"
        value={state.address}
        onChange={handleChange}
        />
         {errors.address && (
          <div class="text-danger mt-2">
            Please enter a valid address
          </div>
          )}
    </div>
    <div class="col">
    <label class="form-label">Contact Number</label>
        <input 
        type="text"
        name="contactNumber" 
        className='form-control'
        placeholder="Enter Contact Number of the employee"
        value={state.contactNumber}
        onChange={handleChange}
        maxLength="10"
        />
         {errors.contactNumber && (
          <div class="text-danger mt-2">
            Contact Number should be 10 digits
          </div>
          )}
    </div>
    <div class="col">
    <label class="form-label">Position</label>
        <input 
        type="text"
        name="position" 
        className='form-control'
        placeholder="Enter position of the employee"
        value={state.position}
        onChange={handleChange}
        />
         {errors.position && (
          <div class="text-danger mt-2">
            Position must contain only letters
          </div>
          )}
    </div>
    <div class="col">
    <label class="form-label">Department</label>
        <input 
        type="text"
        name="department" 
        className='form-control'
        placeholder="Enter department of the employee"
        value={state.department}
        onChange={handleChange}
        />
         {errors.department && (
          <div class="text-danger mt-2">
            Department must contain only letters
          </div>
          )}
    </div>
    <div class="col">
    <label class="form-label">Joined Date</label>
        <input 
        type="date"
        name="joinedDate" 
        className='form-control'
        placeholder="Enter position of the employee"
        value={state.joinedDate}
        onChange={handleChange}
        />
         {errors.joinedDate && (
          <div class="text-danger mt-2">
            Joined date is required
          </div>
          )}
    </div>

    <button className='btn btn-success mt-5'  style={{backgroundColor: "#596584 "}}
     type='submit' onClick={onsubmit}>
         Save
      </button>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default AddEmployee