import React from 'react'
import Header from '../../component/Header'

const CustomerReport = () => {
  return (
    <>
    <div class="col">
        <Header dashboard={"Customer Care System"} />
    </div>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col py-3">
            Customer Care Report
            <button className='btn btn-primary mt-5' type='submit'>
            <a href="./view"  style={{textDecoration: 'none', color:'white'}}>Back</a>
            </button>
        </div>
        </div>
      </div>
    </>
  )
}

export default CustomerReport