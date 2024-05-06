import React from 'react'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import NavBar from '../../component/NavBar'
import SideMenuControl from '../../component/SideMenuControl'
import { useDispatch } from "react-redux";
import { setLogin, setMenu }  from "../../state/state";
import Manager from '../../component/sideMenus/Operator'

const Login = () => {
  const dispatch = useDispatch();
  
  const [state, setState ] = useState({
    emp_id: "",
    password: "",
  })
  const navigate = useNavigate();

  const handleChange = (e) => { 
    const {name, value} = e.target;

  setState({...state,[name]:value})
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
    );

    dispatch(setMenu({menuType: data.emp_id}))

    if(state.emp_id.startsWith("op") && /^\d{4}$/.test(state.emp_id.slice(2))  &&state.password.length === 6 ){
      navigate("../../pages/employee_manage/Operator_view");
      alert("Login Successfully");
    }
    else if(state.emp_id.startsWith("fa") && /^\d{4}$/.test(state.emp_id.slice(2)) &&state.password.length === 6){
      navigate("../../pages/inventory/Factory_view");
      alert("Login Successfully");
    }
    else if(state.emp_id.startsWith("as") && /^\d{4}$/.test(state.emp_id.slice(2)) &&state.password.length === 6){
      navigate("../../pages/payment/Assistant");
      alert("Login Successfully");
    }
    else if(state.emp_id.startsWith("se") && /^\d{4}$/.test(state.emp_id.slice(2)) &&state.password.length === 6){
      navigate("../../pages/delivery/SalesExecutive_view");
      alert("Login Successfully");
    }
    else if(state.emp_id.startsWith("md") && /^\d{4}$/.test(state.emp_id.slice(2)) &&state.password.length === 6){
      navigate("../../pages/employee_manage/ManagingDirector_view");
      alert("Login Successfully");
    }
    else if(state.emp_id.startsWith("cm") && /^\d{4}$/.test(state.emp_id.slice(2)) &&state.password.length === 6){
      navigate("../../pages/employee_salary/CreditManager_view");
      alert("Login Successfully");
    }
    else {
      console.log("error")
    }

  }

  
}


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
                      <input type="email" id="emp_id" value={state.emp_id} onChange={handleChange} name="emp_id" class="form-control form-control-lg" />
                      <label class="form-label" for="emp_id"  >Employee Number</label>
                    </div>
  
                    <div class="form-outline mb-4">
                      <input type="password" id="password" class="form-control form-control-lg"  value={state.password} onChange={handleChange} name="password"/>
                      <label class="form-label" for="password">Password</label>
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
  )
}

export default Login