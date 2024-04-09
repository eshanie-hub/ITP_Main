import React from 'react'

const Sales_Executive = () => {
  return (
    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 pt-5" style={{backgroundColor: "#e2e9fc"}}>
    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-black min-vh-100">
        <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-black text-decoration-none pb-5 pt-4">
            <span class="fs-5 d-none d-sm-inline">Sales Executive</span>
        </a>
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start text-black" id="menu">
            <li class="nav-item mb-3">
                <a href="../../../pages/delivery/SalesExecutive_view" class="nav-link align-middle px-0 text-black ">
                    <span class="">Delivery Schedule System</span>
                </a>
            </li>
            <li class="nav-item mb-3">
                <a href="../../../pages/inventory/view" class="nav-link align-middle px-0 text-black">
                    <span class="">Inventory Management System</span>
                </a>
            </li>
            <li class="nav-item mb-3">
                <a href="../../../pages/order_placement/SalesExecutive_view" class="nav-link align-middle px-0 text-black">
                    <span class="">Order Placement System</span>
                </a>
            </li>
            </ul>
        </div>
    </div>
  )
}

export default Sales_Executive