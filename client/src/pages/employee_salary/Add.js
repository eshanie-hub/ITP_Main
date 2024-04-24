import React, { useState } from 'react';
import Header from '../../component/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    EmpId: "",
    EmpName: "",
    BasicSalary: "",
    Bonus: "",
    Tax: "",
    NetSalary: "",
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateValues = (inputValues) => {
    let errors = {};
    if (isNaN(inputValues.EmpId) || inputValues.EmpId.length < 3) {
      errors.EmpId = "Employee ID must be a valid number";
    }
    if (inputValues.EmpName.length < 4) {
      errors.EmpName = "Employee Name is too short";
    }
    if (typeof inputValues.EmpName !== 'string') {
      errors.EmpName = "Employee Name must be a string";
    }
    if (isNaN(inputValues.BasicSalary) || inputValues.BasicSalary.length < 1) {
      errors.BasicSalary = "Basic Salary must be a valid number";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  let updatedState = { ...state, [name]: value };

  if (name === 'BasicSalary') {
    const basicSalary = parseFloat(value);

    // Calculate bonus (10% of Basic Salary)
    const bonus = basicSalary * 0.1;

    // Calculate Tax based on Basic Salary
    let tax = 0;
    if (basicSalary >= 50000) {
      tax = basicSalary * 0.05;
    } else if (basicSalary >= 30000) {
      tax = basicSalary * 0.03;
    }

    // Calculate Net Salary (Basic Salary + Bonus - Tax)
    const netSalary = basicSalary + bonus - tax;

    updatedState = {
      ...updatedState,
      Bonus: bonus.toFixed(2),
      Tax: tax.toFixed(2),
      NetSalary: netSalary.toFixed(2)
    };
  }

  setState(prevState => ({
    ...prevState,
    ...updatedState
  }));

  setErrors(validateValues(updatedState));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateValues(state);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitting(true);
      axios.post("http://localhost:8000/salary/add", state)
        .then((res) => {
          alert("Item added to inventory");
          navigate(-1);
        })
        .catch((error) => {
          console.error("Error adding item:", error);
        });
    }
  };

  return (
    <>
      <div className="col">
        <Header dashboard={"Employee Salary Management"} />
      </div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col py-3">
            <div className="mt-5 mb-5 ">
              <h4>
                <span className="badge text-bg-secondary">
                  Salary Add
                </span>
              </h4>
            </div>
            <div className="row mb-5">
              <div className="col">
                <label className="form-label">Employee Id</label>
                <input
                  type="text"
                  name="EmpId"
                  className="form-control"
                  placeholder="Enter EmpId"
                  value={state.EmpId}
                  onChange={handleChange}
                />
                {errors.EmpId && (
                  <div className="text-danger mt-2">
                    {errors.EmpId}
                  </div>
                )}
              </div>
              <div className="col-6">
                <label className="form-label">Employee Name</label>
                <input
                  type="text"
                  name="EmpName"
                  className="form-control"
                  placeholder="Enter Employee Name"
                  value={state.EmpName}
                  onChange={handleChange}
                />
                {errors.EmpName && (
                  <div className="text-danger mt-2">
                    {errors.EmpName}
                  </div>
                )}
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <label className="form-label">Basic Salary</label>
                <input
                  type="text"
                  name="BasicSalary"
                  className="form-control"
                  placeholder="Enter Basic Salary "
                  value={state.BasicSalary}
                  onChange={handleChange}
                />
                {errors.BasicSalary && (
                  <div className="text-danger mt-2">
                    {errors.BasicSalary}
                  </div>
                )}
              </div>
              <div className="col">
                <label className="form-label">Bonus</label>
                <input
                  type="text"
                  name="Bonus"
                  className="form-control"
                  value={state.Bonus}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label className="form-label">Tax</label>
                <input
                  type="text"
                  name="Tax"
                  className="form-control"
                  value={state.Tax}
                  onChange={handleChange}
                />
              </div>
              <div className="col">
                <label className="form-label"> Net Salary</label>
                <input
                  type="text"
                  name="NetSalary"
                  className="form-control"
                  value={state.NetSalary}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button className="btn mt-5" style={{backgroundColor: "#c1b688"}} type="submit" onClick={onSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;