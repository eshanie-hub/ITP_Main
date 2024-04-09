import React from 'react'
import Factory from './sideMenus/Factory'
import Operator from './sideMenus/Operator'
import { Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import Assistant from './sideMenus/Assistant';
import SalesExecutive from './sideMenus/Sales_Executive';
import ManagingDirector from './sideMenus/Managing_Director';
import CreditManager from './sideMenus/Credit_Manager';


const SideMenuControl = () => {
 const menu = useSelector((state) => state.emp_id);
  console.log(menu)
  return (
    <div class="container-fluid">
    <div class="row flex-nowrap ">
      {menu==="op" && <Operator />}
      {menu ==="fa" && <Factory />}
      {menu ==="as" && <Assistant />}
      {menu ==="se" && <SalesExecutive />}
      {menu ==="md" && <ManagingDirector />}
      {menu ==="cm" && <CreditManager />}
        <div class="col py-3 m-5">
          
        <Outlet/>
        </div>
    </div>
</div>
  )
}

export default SideMenuControl