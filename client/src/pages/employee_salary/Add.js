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
    if (inputValues.EmpId.length < 3) {
      errors.EmpId = "Employee ID is too short";
    }
    if (inputValues.EmpName.length < 4) {
      errors.EmpName = "Employee Name is too short";
    }
    if (inputValues.BasicSalary.length < 1) {
      errors.BasicSalary = "Basic Salary can't be null";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setErrors(validateValues({ ...state, [name]: value }));
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
        <Header dashboard={"Employee Salary Management System"} />
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
                  placeholder="Enter EmpId of the post"
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
                  placeholder="Enter EmpName of the post"
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
                  placeholder="Enter BasicSalary of the post"
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
                  placeholder="Enter Bonus of the post"
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
                  placeholder="Enter Tax of the post"
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
                  placeholder="Enter NetSalary of the post"
                  value={state.NetSalary}
                  onChange={handleChange}
                />
              </div>
            </div>
            <button className="btn btn-success mt-5" type="submit" onClick={onSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Add;