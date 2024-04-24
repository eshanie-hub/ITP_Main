import React from 'react'
import View from './view'

const FactoryDelivery_view = () => {
  return (
    <>
      <View />
      <button className='btn mt-5' style={{backgroundColor: "#c1b688"}} type='submit'>
            <a href="./add"  style={{textDecoration: 'none', color:'white'}}>Add</a>
      </button>
    </>
  )
}

export default FactoryDelivery_view