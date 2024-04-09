import React from 'react'
import Header from '../../component/Header'

const Payment_report = () => {
  return (
    <>
      <div class="col">
          <Header dashboard={"Customer Payment History System"} />
      </div>
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col py-3">
            Payment report
            <button className='btn btn-primary mt-5' type='submit'>
            <a href="./CreditManager_view"  style={{textDecoration: 'none', color:'white'}}>Back</a>
            </button>
            </div>
           
        </div>
      </div>
    </>
  )
}

export default Payment_report