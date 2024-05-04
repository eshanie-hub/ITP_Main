import React from 'react'

const Managing_Director = () => {
    return (
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 pt-5" style={{backgroundColor: "#596584"}}>
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-light min-vh-100">
            <a class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-light text-decoration-none pb-5 pt-4">
                <span class="fs-5 d-none d-sm-inline"><b>MANAGING DIRECTOR</b></span>
            </a>
            <ul class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start text-light" id="menu">
                <li class="nav-item mb-3">
                    <a href="../../../pages/employee_manage/ManagingDirector_view" class="nav-link align-middle px-0 text-light ">
                        <span class="">Employee Management </span>
                    </a>
                </li>
                <li class="nav-item mb-3">
                    <a href="../../../pages/employee_salary/ManagingDirector_view" class="nav-link align-middle px-0 text-light">
                        <span class="">Employee Salary Management</span>
                    </a>
                </li>
                <li class="nav-item mb-3">
                    <a href="../../../pages/inventory/ManagingDirector_view" class="nav-link align-middle px-0 text-light">
                        <span class="">Inventory Control Management </span>
                    </a>
                </li>
                <li class="nav-item mb-3">
                    <a href="../../../pages/order_placement/ManagingDirector_view" class="nav-link align-middle px-0 text-light">
                        <span class="">Order Placement Management</span>
                    </a>
                </li>
                <li class="nav-item mb-3">
                    <a href="../../../pages/distributor/ManagingDirector_view" class="nav-link align-middle px-0 text-light">
                        <span class="">Distributor Management </span>
                    </a>
                </li>
                </ul>
            </div>
        </div>
      )
}

export default Managing_Director