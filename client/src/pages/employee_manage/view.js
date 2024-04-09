import React, { useEffect, useState }  from 'react'
import Header from '../../component/Header';
import axios from 'axios';

const View = () => {
  const [search, setSearch] = useState("");
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
        <Header dashboard={"Employee Management System"} setSearch={setSearch} />
    </div>
    <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col py-3">
         {/* details */}
         <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Emp Id</th>
                    <th scope="col">Emp Name</th>
                    <th scope="col">Date Of Birth</th>
                    <th scope="col">Address</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Position</th>
                    <th scope="col">Department</th>
                    <th scope="col">joined Date</th>
                    </tr>
                </thead>
                <tbody>
                {state.empDetails.filter((empDetails) => {
                  return search.toLowerCase()===''
                  ? empDetails
                  : empDetails.empID.toLowerCase().includes(search);
                })
                
                .map((empDetails, index) => (
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
        </div>
    </div>
</div>
</>
  )
}

export default View