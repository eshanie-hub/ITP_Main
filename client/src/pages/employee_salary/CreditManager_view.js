import React, { useEffect, useState } from 'react'
import Header from '../../component/Header';
import axios from 'axios'

const CreditManager_view = () => {
  const [search, setSearch] = useState("");
  const [state, setState] = useState({
    salary: []
})

useEffect(() => {
    axios.get("http://localhost:8000/salary/").then(res =>{
        if(res.data){
          setState({
            salary:res.data
          })
        }
      })
    }, [state]);
  
  
    const onDelete = (id) => {
      axios.delete(`http://localhost:8000/salary/delete/${id}`)
      .then((res) => {
        alert("Deleted successfully");
        
      })
    }
  return (
    <>
    <div class="col">
        <Header dashboard={"Employee Salary Management"} setSearch={setSearch}/>
    </div>
    <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col py-3">
      <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Employee Id</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Basic Salary</th>
                    <th scope="col">Bonus</th>
                    <th scope="col">Tax</th>
                    <th scope="col">Net Salary</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                {state.salary.filter((salary)=>{
                    return search.toLowerCase()===''
                    ? salary
                    :salary.EmpName.toLowerCase().includes(search);
                  })
                .map((salary, index) => (
                    <tr key={index}>
                    <td>{salary.EmpId}</td>
                    <td>{salary.EmpName}</td>
                    <td>{salary.BasicSalary}</td>
                    <td>{salary.Bonus}</td>
                    <td>{salary.Tax}</td>
                    <td>{salary.NetSalary}</td>
                    <td>
                    <div class="d-grid gap-2">
                    <button type="button" class="btn btn-sm" style={{backgroundColor: "#596584 "}} >
                        <a href={`/pages/employee_salary/edit/${salary._id}`} style={{textDecoration: 'none', color:'white'}}>
                            update
                        </a>
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" onClick={() => onDelete(salary._id)}>Delete</button>
                    </div>
                    </td>
                    </tr>
                ))}
                </tbody>
                </table>
        <button className='btn mt-5' style={{backgroundColor:"#c1b688"}} type='submit'>
            <a href="./add"  style={{textDecoration: 'none', color:'black'}}>Add</a>
      </button>
        </div>
        </div>
    </div>
    </>
  )
}

export default CreditManager_view