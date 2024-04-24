import React, { useEffect, useState } from 'react'
import Header from '../../component/Header';
import axios from 'axios';

const View = () => {
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
        <Header dashboard={"Employee Salary Management"}  setSearch={setSearch}/>
    </div>
    <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col py-3">

      {/* details */}
            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Employee ID</th>
                    <th scope="col">Employee Name</th>
                    <th scope="col">Basic Salary</th>
                    <th scope="col">Bonus</th>
                    <th scope="col">Tax</th>
                    <th scope="col">Net Salary</th>
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