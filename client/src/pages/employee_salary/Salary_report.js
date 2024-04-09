import React from 'react'
import Header from '../../component/Header'

const Salary_report = () => {
  return (
    <>
    <div class="col">
        <Header dashboard={"Employee Salary Management System"} />
    </div>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col py-3">
            Employee Salary Report
            <button className='btn btn-primary mt-5' type='submit'>
            <a href="./Operator_view"  style={{textDecoration: 'none', color:'white'}}>Back</a>
            </button>
        </div>
        </div>
      </div>
    </>
  )
}

export default Salary_report