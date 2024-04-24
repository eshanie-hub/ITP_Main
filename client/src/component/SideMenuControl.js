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
      
      {menu.startsWith("op") && /^\d{4}$/.test(menu.slice(2)) && <Operator /> }
      {menu.startsWith("fa") && /^\d{4}$/.test(menu.slice(2)) && <Factory />}
      {menu.startsWith("as") && /^\d{4}$/.test(menu.slice(2)) && <Assistant />}
      {menu.startsWith("se") && /^\d{4}$/.test(menu.slice(2)) && <SalesExecutive />}
      {menu.startsWith("md") && /^\d{4}$/.test(menu.slice(2)) && <ManagingDirector />}
      {menu.startsWith("cm") && /^\d{4}$/.test(menu.slice(2)) && <CreditManager />}
        <div class="col py-3 m-5">
          
        <Outlet/>
        </div>
    </div>
</div>
  )
}

export default SideMenuControl