import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import axios from 'axios'

const Operator_view = () => {
  const [search, setSearch] = useState('');
  const [state, setState] = useState({
    empDetails: [],
  });
 

  useEffect(() => {
    axios.get('http://localhost:8000/empDetails/').then((res) => {
      if (res.data) {
        setState({
          empDetails: res.data,
        });
      }
    });
  }, [state]);

  const onDelete = (id) => {
    axios.delete(`http://localhost:8000/empDetails/delete/${id}`)
      .then((res) => {
        alert("Deleted Employee Details Successfully");
      })
      .catch(error => {
        console.error("Error Deleting Employee", error);
      });
  };
    
  return (
    <>
      <div class="col">
          <Header dashboard={"Employee Management System"} setSearch={setSearch}/>
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
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                {state.empDetails.filter((empDetails) => {
                  return search.toLowerCase()===''
                  ? empDetails
                  : empDetails.empID.toLowerCase().includes(search);
                }).map((empDetails, index) => (
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
                    <div class="d-grid gap-2">
                    <button type="button" class="btn btn-success btn-sm"  style={{backgroundColor: "#596584 "}}>
                        <a href={`/pages/employee_manage/edit/${empDetails._id}`} style={{textDecoration: 'none', color:'white'}}>
                            Update
                        </a>
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" onClick={() => onDelete(empDetails._id)}>Delete</button>
                    </div>
                    </td>
                    </tr>
                ))}
                </tbody>
                </table>
          <button className='btn btn-primary mt-5' type='submit'>
            <a href="./add"  style={{textDecoration: 'none', color:'white'}}>Add</a>
      </button>
            </div>
        </div>
      </div>
    </>
  )
}

export default Operator_view