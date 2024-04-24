import React from 'react'
import { Outlet } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
    <nav class="navbar navbar-expand-lg px-5 " style={{backgroundColor: "#596584 "}} data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="/">VIDMA</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/product">Product</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/contact">Contact us</a>
        </li>
      </ul>
      <div class="d-flex">
        <button class="btn text-black" style={{backgroundColor: "#c1b688"}} ><a href="/login"  class="nav-link">Login</a></button>
      </div>
    </div>
  </div>
</nav>

<div>
<Outlet/>
</div>

</>
  )
}

export default NavBar