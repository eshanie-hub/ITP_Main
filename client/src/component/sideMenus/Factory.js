import React from 'react'

const Factory = () => {
  return (
    <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 pt-5" style={{backgroundColor: "#596584"}}>
    <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-light min-vh-100">
        <a href="/" class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-light text-decoration-none pb-5 pt-4">
            <span class="fs-5 d-none d-sm-inline"><b>FACTORY MANAGER</b></span>
        </a>
        <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start text-light" id="menu">
            <li class="nav-item mb-3">
                <a href="../../../pages/inventory/Factory_view" class="nav-link align-middle px-0 text-light ">
                    <span class="">Inventory Management System</span>
                </a>
            </li>
            <li class="nav-item mb-3">
                <a href="../../../pages/order_placement/view" class="nav-link align-middle px-0 text-light">
                    <span class="">Order Placement System</span>
                </a>
            </li>
            <li class="nav-item mb-3">
                <a href="../../../pages/delivery/FactoryDelivery_view" class="nav-link align-middle px-0 text-light">
                    <span class="">Delievery Schedule System</span>
                </a>
            </li>
            </ul>
        </div>
    </div>
  )
}

export default Factory