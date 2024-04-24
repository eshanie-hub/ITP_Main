import React from 'react'
import Header from '../../component/Header';
import View from './view';

const ManagingDirector_view = () => {
  return (
    <>
        <View />
        <button className='btn mt-5' style={{backgroundColor: "#c1b688 "}}  type='submit'>
            <a href="./report"  style={{textDecoration: 'none', color:'white'}}>Report</a>
      </button>
    </>
  )
}

export default ManagingDirector_view