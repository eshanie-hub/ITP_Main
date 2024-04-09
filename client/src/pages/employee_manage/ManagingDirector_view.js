import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import axios from 'axios'

const ManagingDirector_view = () => {
  const [state, setState] = useState({
    empDetails: []
})

useEffect(() => {
    axios.get("http://localhost:8000/empDetails/").then(res =>{
        if(res.data){
          setState({
            empDetails:res.data
          })
        }
      })
    }, [state]);
  return (
    <>
    <div class="col">
        <Header dashboard={"Employee Management System"} />
    </div>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col py-3">
        
        {/* table */}
        <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Emp ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date Of Birth</th>
                    <th scope="col">Address</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Position</th>
                    <th scope="col">Department</th>
                    <th scope="col">Joined Date</th>
                    </tr>
                </thead>
                <tbody>
                {state.empDetails.map((empDetails, index) => (
                    <tr key={index}>
                    <td>{empDetails.empID}</td>
                    <td>{empDetails.name}</td>
                    <td>{empDetails.dateOfBirth}</td>
                    <td>{empDetails.address}</td>
                    <td>{empDetails.contactNumber}</td>
                    <td>{empDetails.position}</td>
                    <td>{empDetails.department}</td>
                    <td>{empDetails.joinedDate}</td>
                    <td>
                    
                    </td>
                    </tr>
                ))}
                </tbody>
                </table>
        <button className='btn btn-primary mt-5' type='submit'>
            <a href="./report"  style={{textDecoration: 'none', color:'white'}}>Report</a>
      </button>
          </div>
      </div>
    </div>
  </>
  )
}

export default ManagingDirector_view