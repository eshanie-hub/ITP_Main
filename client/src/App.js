import React from 'react'
import {BrowserRouter, Routes, Route } from "react-router-dom"
import NavBar from "./component/NavBar.js"
import Home from "./pages/Home.js"
import Product from "./pages/Product"
import Contact from "./pages/contact"
import Login from "./pages/login/Login"

import { useSelector } from "react-redux";
// import SideNav from "./component/SideNav.js"
import EmployeeManage from "./pages/employee_manage/view.js"
import Delivery from "./pages/delivery/view.js"
import Customer from "./pages/customer/view"

import SideMenuControl from './component/SideMenuControl.js'
import Inventory from './pages/inventory/view'
import Order from './pages/order_placement/view'
import Distributor from './pages/distributor/view'
import Payment from './pages/payment/view.js'
import Salary from './pages/employee_salary/view.js'
import AssistantInventory from './pages/inventory/Assistant_view.js'
import InventoryAdd from './pages/inventory/AddItem.js'
import FactoryInventory from './pages/inventory/Factory_view'
import ManagingDirectorInventory from './pages/inventory/ManagingDirector_view'
import InventoryReport from './pages/inventory/Inventory_report.js'
import { EditItem } from './pages/inventory/EditItem.js'
import CreditManagerPayment from './pages/payment/CreditManager_view.js'
import AssistantPayment from './pages/payment/Assistant.js'
import PaymentAdd from './pages/payment/AddPay.js'
import EditPay from './pages/payment/EditPay.js'
import PaymentReport from './pages/payment/Payment_report.js'

//order
import ManagingDirectorOrder from './pages/order_placement/ManagingDirector_view.js'
import OrderReport from './pages/order_placement/report.js'
import CreditManagerOrder from './pages/order_placement/CreditManager_view.js'
import EditOrder from './pages/order_placement/EditOrder.js'
import SalesExecutiveOrder from './pages/order_placement/SalesExecutive_view.js'
import AddOrder from './pages/order_placement/AddOrder.js'

//delievery
import SalesExecutiveDelivery from './pages/delivery/SalesExecutive_view.js'
import OperatorDelivery from './pages/delivery/Operator_view.js'
import DeliveryReport from './pages/delivery/Delivery_report.js'
import EditDelivery from './pages/delivery/EditDelivery.js'
import FactoryDelivery from './pages/delivery/FactoryDelivery_view.js'
import AddDelivery from './pages/delivery/AddDelivery.js'


//employee manage
import OperatorEmployee from './pages/employee_manage/Operator_view.js'
import EmployeeReport from './pages/employee_manage/Employee_Report.js'
import ManagingDirectorEmployee from  './pages/employee_manage/ManagingDirector_view.js'
import AddEmployee from './pages/employee_manage/AddEmployee.js'
import EditEmployee from './pages/employee_manage/EditEmployee.js'

//Salary
import CreditManagerSalary from './pages/employee_salary/CreditManager_view.js'
import AddSalary from './pages/employee_salary/Add.js'
import EditSalary from './pages/employee_salary/EditSalary.js'
import SalaryReport from './pages/employee_salary/Salary_report.js'
import ManagingDirectorSalary from './pages/employee_salary/ManagingDirector_view.js'

//Distributor
import ManagingDirectorDistributor from './pages/distributor/ManagingDirector_view.js'
import DistributorReport from './pages/distributor/DistributorReport.js'
import AssistantDistributor from './pages/distributor/AssistantDistributor.js'
import AddDistributor from './pages/distributor/AddDistributor.js'
import EditDistributor from './pages/distributor/EditDistributor.js'
import CustomerReport from './pages/customer/CustomerReport.js'
import EditCustomer from './pages/customer/EditCustomer.js'
import UpdatePay from './pages/payment/updatePay.js'

const App = () => {

  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/product" element={<Product />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>

          
          <Route path="/" element={isAuth ?  <SideMenuControl/> : <Home /> }>
            <Route path="/pages/employee_manage/view" element={isAuth ? <EmployeeManage /> : <Home /> }></Route>
            <Route path="/pages/delivery/view" element={isAuth ?<Delivery /> :  <Home /> }></Route>


            {/* Customer */}
            <Route path="/pages/customer/view" element={isAuth ? <Customer /> : <Home /> }></Route>
            <Route path="/pages/customer/report" element={isAuth ? <CustomerReport /> : <Home /> }></Route>
            <Route path="/pages/customer/edit/:id" element={isAuth ? <EditCustomer /> : <Home /> }></Route>

            <Route path="/pages/customer/view" element={isAuth ? <Customer /> : <Home /> }></Route>

            
            {/* Inventory Routes */}
            <Route path="/pages/inventory/view" element={isAuth ? <Inventory /> : <Home /> }></Route>
            <Route path="/pages/inventory/add" element={isAuth ? <InventoryAdd /> : <Home /> }></Route>
            <Route path="/pages/inventory/report" element={isAuth ? <InventoryReport /> : <Home /> }></Route>

            <Route path="/pages/inventory/Assistant_view" element={isAuth ? <AssistantInventory /> : <Home /> }></Route>
            <Route path="/pages/inventory/Factory_view" element={isAuth ? <FactoryInventory /> : <Home /> }></Route>
            <Route path="/pages/inventory/ManagingDirector_view" element={isAuth ? <ManagingDirectorInventory /> : <Home /> }></Route>
            <Route path="/pages/inventory/edit/:id" element={isAuth ? <EditItem /> : <Home /> }></Route>

            {/* Payment */}
            <Route path="/pages/payment/add/:id" element={isAuth ? <PaymentAdd /> : <Home /> }></Route> 
            <Route path="/pages/payment/update/:id" element={isAuth ? <UpdatePay /> : <Home /> }></Route>       
            <Route path="/pages/payment/report" element={isAuth ? <PaymentReport /> : <Home /> }></Route>
            <Route path="/pages/payment/edit/:id" element={isAuth ? <EditPay /> : <Home /> }></Route>
            <Route path="/pages/payment/CreditManager_view" element={isAuth ? <CreditManagerPayment /> : <Home /> }></Route>
            <Route path="/pages/payment/Assistant" element={isAuth ? <AssistantPayment /> : <Home /> }></Route>
            
            

            {/* Order */}
            <Route path="/pages/order_placement/view" element={isAuth ? <Order /> : <Home /> }></Route>
            <Route path="/pages/order_placement/report" element={isAuth ? <OrderReport /> : <Home /> }></Route>
            <Route path="/pages/order_placement/add" element={isAuth ? <AddOrder /> : <Home /> }></Route>
            <Route path="/pages/order_placement/edit/:id" element={isAuth ? <EditOrder /> : <Home /> }></Route>

            <Route path="/pages/order_placement/ManagingDirector_view" element={isAuth ? <ManagingDirectorOrder /> : <Home /> }></Route>
            <Route path="/pages/order_placement/CreditManager_view" element={isAuth ? <CreditManagerOrder /> : <Home /> }></Route>
            <Route path="/pages/order_placement/SalesExecutive_view" element={isAuth ? <SalesExecutiveOrder /> : <Home /> }></Route>

            {/* Delivery */}
            <Route path="/pages/delivery/SalesExecutive_view" element={isAuth ? <SalesExecutiveDelivery /> : <Home /> }></Route>
            <Route path="/pages/delivery/Operator_view" element={isAuth ? <OperatorDelivery /> : <Home /> }></Route>
            <Route path="/pages/delivery/FactoryDelivery_view" element={isAuth ? <FactoryDelivery /> : <Home /> }></Route>
            <Route path="/pages/delivery/Delivery_report" element={isAuth ? <DeliveryReport /> : <Home /> }></Route>
            <Route path="/pages/delivery/edit/:id" element={isAuth ? <EditDelivery /> : <Home /> }></Route>
            <Route path="/pages/delivery/add" element={isAuth ? <AddDelivery /> : <Home /> }></Route>


            {/* Employee */}
            <Route path="/pages/employee_manage/Operator_view" element={isAuth ? <OperatorEmployee /> : <Home /> }></Route>
            <Route path="/pages/employee_manage/report" element={isAuth ? <EmployeeReport /> : <Home /> }></Route>
            <Route path="/pages/employee_manage/ManagingDirector_view" element={isAuth ? <ManagingDirectorEmployee /> : <Home /> }></Route>
            <Route path="/pages/employee_manage/add" element={isAuth ? <AddEmployee /> : <Home /> }></Route>
            <Route path="/pages/employee_manage/edit/:id" element={isAuth ? <EditEmployee /> : <Home /> }></Route>


            {/* Salary */}
            <Route path="/pages/employee_salary/CreditManager_view" element={isAuth ? <CreditManagerSalary /> : <Home /> }></Route>
            <Route path="/pages/employee_salary/add" element={isAuth ? <AddSalary /> : <Home /> }></Route>
            <Route path="/pages/employee_salary/edit/:id" element={isAuth ? <EditSalary /> : <Home /> }></Route>
            <Route path="/pages/employee_salary/report" element={isAuth ? <SalaryReport /> : <Home /> }></Route>
            <Route path="/pages/employee_salary/ManagingDirector_view" element={isAuth ? <ManagingDirectorSalary /> : <Home /> }></Route>
            
            {/* Distributor */}
            <Route path="/pages/distributor/ManagingDirector_view" element={isAuth ? <ManagingDirectorDistributor /> : <Home /> }></Route>
            <Route path="/pages/distributor/report" element={isAuth ? <DistributorReport /> : <Home /> }></Route>
            <Route path="/pages/distributor/Assistant_view" element={isAuth ? <AssistantDistributor /> : <Home /> }></Route>
            <Route path="/pages/distributor/add" element={isAuth ? <AddDistributor /> : <Home /> }></Route>
            <Route path="/pages/distributor/edit/:id" element={isAuth ? <EditDistributor /> : <Home /> }></Route>


            <Route path="/pages/distributor/view" element={isAuth ? <Distributor /> : <Home /> }></Route>
            

            <Route path="/pages/employee_salary/view" element={isAuth ? <Salary /> : <Home /> }></Route>
            
            
            
            
          </Route>
     </Routes>
    </BrowserRouter>
  )
}

export default App