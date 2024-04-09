import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import axios from 'axios';

const ManagingDirector_view = () => {
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


  return (
    <>
    <div class="col">
        <Header dashboard={"Employee Salary System"} setSearch={setSearch}/>
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
                    <button type="button" class="btn btn-success btn-sm">
                        <a href={`/pages/employee_salary/edit/${salary._id}`} style={{textDecoration: 'none', color:'white'}}>
                            update
                        </a>
                    </button>
                    </div>
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