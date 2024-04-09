import React from 'react'
import View from './view'

const Assistant = () => {
  return (
    <div>
        <View />
        <button className='btn btn-primary mt-5' type='submit'>
            <a href="./add"  style={{textDecoration: 'none', color:'white'}}>Create</a>
      </button>
    </div>
  )
}

export default Assistant