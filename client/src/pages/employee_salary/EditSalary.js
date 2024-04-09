import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../component/Header';

export const EditSalary = () => {
  const params = useParams();
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
      errors.BasicSalary = "Basic Salary is too short";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
    setErrors(validateValues({ ...state, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validateValues(state);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0 ) {
      setSubmitting(true);
      axios.put(`http://localhost:8000/salary/update/${params.id}`, state)
        .then((res) => {
          alert("Data submitted successfully");
          navigate(-1);
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
        });
    }
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/salary/get/${params.id}`).then((res) => {
      if (res.data) {
        setState({
          EmpId: res.data.EmpId,
          EmpName: res.data.EmpName,
          BasicSalary: res.data.BasicSalary,
          Bonus: res.data.Bonus,
          Tax: res.data.Tax,
          NetSalary: res.data.NetSalary,
        });
      }
    });
  }, [params.id]);

  return (
    <>
      <div className="col">
        <Header dashboard={"Employee Salary System"} />
      </div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col py-3">
            <div className="mt-5 mb-5">
              <h4>
                <span className="badge text-bg-secondary">
                  Salary Update
                </span>
              </h4>
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
                    placeholder="Enter Employee Name of the post"
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
                  <label className="form-label">Net Salary</label>
                  <input
                    type="text"
                    name="NetSalary"
                    className="form-control"
                    placeholder="Enter NetSalary of the post"
                    value={state.NetSalary}
                    onChange={handleChange}
                  />
                </div>
                <button className="btn btn-success mt-5" type="submit" onClick={onSubmit}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSalary;