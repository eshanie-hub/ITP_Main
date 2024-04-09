import React from 'react'
import Header from '../../component/Header'

const report = () => {
  return (
    <>
    <div class="col">

        <Header dashboard={"Order Placement System"} />

    </div>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col py-3">
            Report
            <button className='btn btn-primary mt-5' type='submit'>
            <a href="./ManagingDirector_view"  style={{textDecoration: 'none', color:'white'}}>Back</a>
            </button>
        </div>
        </div>
      </div>
    </>
  )
}

export default report