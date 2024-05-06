import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import NavBar from "../../component/NavBar";
import SideMenuControl from "../../component/SideMenuControl";
import { useDispatch } from "react-redux";
import { setLogin, setMenu } from "../../state/state";
import Manager from "../../component/sideMenus/Operator";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [state, setState ] = useState({
    emp_id: "",
    password: "",
  })
  const [errors, setErrors] = useState({
    empIdError: '',
    passwordError: '',
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;

  setState({...state,[name]:value});
  setErrors({ ...errors, [`${name}Error`]: '' });
}
const handleForm = (e) => {
  const {emp_id, password} = state;
  const data = {
    emp_id: emp_id, 
    password: password,
  }
  if(data!== null){
    dispatch(
     setLogin({
      emp_id: data.emp_id,
     })
    )}
    // Reset error messages
    setErrors({ empIdError: '', passwordError: '' });
    // Validate emp_id
    if (!emp_id || !/^([a-zA-Z]{2}\d{4})$/.test(emp_id)) {
      setErrors({
        ...errors,
        empIdError: 'Invalid Employee Number. Format: xx1234',
      });
      return;
    }

    // Validate password
    if (!password || password.length !== 6) {
      setErrors({
        ...errors,
        passwordError: 'Password should be 6 characters.',
      });
      return;
    }

    dispatch(setLogin({ emp_id }));

    navigate(`../../pages/${getRedirectPath(emp_id)}`);
    alert("Login Successfully");
};

    const getRedirectPath = (emp_id) => {
      switch (true) {
        case emp_id.startsWith('op'):
          return 'employee_manage/Operator_view';
        case emp_id.startsWith('fa'):
          return 'inventory/Factory_view';
        case emp_id.startsWith('as'):
          return 'payment/Assistant';
        case emp_id.startsWith('se'):
          return 'delivery/SalesExecutive_view';
        case emp_id.startsWith('md'):
          return 'employee_manage/ManagingDirector_view';
        case emp_id.startsWith('cm'):
          return 'employee_salary/CreditManager_view';
        default:
          return '';
      }
    
  
};


  return (
    <>
    <section class="bg-image card img-fluid ">
      <img src={require("../../assets/loginbg1.png")}  class="card-img-top" width="100%" style={{height: "92vh"}} alt=""/>
    <div class="container card-img-overlay my-5" >
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col col-xl-8">
          <div class="card" style={{borderRadius: "1rem"}}>
            <div class="row g-0">
              <div class="col-md-6 col-lg-5 d-none d-md-block">
                <img src={require("../../assets/login.jpg")}
                  alt="login form" class="img-fluid" style={{borderRadius: "1rem 0 0 1rem"}} />
              </div>
              <div class="col-md-6 col-lg-7 d-flex align-items-center">
                <div class="card-body p-4 p-lg-5 text-black">
  
                  <form>
  
                    <div class="d-flex align-items-center mb-3 pb-1">
                      <i class="fas fa-cubes fa-2x me-3" style={{color: "#e2dad6"}}></i>
                      <span class="h1 fw-bold mb-0">Login</span>
                    </div>
  
                    <h5 class="fw-normal mb-3 pb-3" style={{letterSpacing: "1px"}}>Sign into your account</h5>
  
                    <div class="form-outline mb-4">
                      <input type="text" id="emp_id" class={`form-control form-control-lg"  ${errors.empIdError ? 'is-invalid' : ''}`}
                      value={state.emp_id} onChange={handleChange} name="emp_id"  />
                      <label class="form-label" for="emp_id"  >Employee Number</label>
                      {state.emp_id && !/^([a-zA-Z]{2}\d{4})$/.test(state.emp_id) && (
                           <div class="invalid-feedback">{errors.empIdError}</div>
                         )}
                    </div>
  
                    <div class="form-outline mb-4">
                      <input type="password" id="password" class={`form-control form-control-lg"  
                      ${errors.passwordError ? 'is-invalid' : ''}`}
                      value={state.password} onChange={handleChange} name="password"/>
                      <label class="form-label" for="password">Password</label>
                      <div class="invalid-feedback">{errors.passwordError}</div>
                    </div>
  
                    <div class="pt-1 mb-4">
                      <button class="btn btn-lg btn-block" type="button" style={{backgroundColor: "#c1b688 "}} onClick={handleForm}>Login</button>
                    </div>
                    </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
                
    </>
  );
};

export default Login;
