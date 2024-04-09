import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';
import axios from 'axios'

const AssistantDistributor = () => {
  const [state, setState] = useState({
    distributor: []
})

useEffect(() => {
    axios.get("http://localhost:8000/distributor/").then(res =>{
        if(res.data){
          setState({
            distributor:res.data
          })
        }
      })
    }, [state]);
  
  
    const onDelete = (id) => {
      axios.delete(`http://localhost:8000/distributor/delete/${id}`)
      .then((res) => {
        alert("Deleted successfully");
        
      })
    }
    const [search, setSearch] = useState("");
        // console.log(search);
  return (
    <>
    <div class="col">
        <Header dashboard={"Distributor Management System"} setSearch={setSearch}/>
    </div>
    <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col py-3">
         {/* details */}
         <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">distributorId</th>
                    <th scope="col">distributorName</th>
                    <th scope="col">phoneNo</th>
                    <th scope="col">creditLimit</th>
                    <th scope="col">agreementStatus</th>
                    <th scope="col">date</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                {state.distributor.filter((distributor) => {
                  return search.toLowerCase()===''
                  ? distributor
                  : distributor.distributorName.toLowerCase().includes(search);
                })
                .map((distributor, index) => (
                    <tr key={index}>
                    <td>{distributor.distributorId}</td>
                    <td>{distributor.distributorName}</td>
                    <td>{distributor.phoneNo}</td>
                    <td>{distributor.creditLimit}</td>
                    <td>{distributor.agreementStatus}</td>
                    <td>{distributor.date}</td>
                    <td>
                    <div class="d-grid gap-2">
                    <button type="button" class="btn btn-success btn-sm">
                        <a href={`/pages/distributor/edit/${distributor._id}`} style={{textDecoration: 'none', color:'white'}}>
                            update
                        </a>
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" onClick={() => onDelete(distributor._id)}>Delete</button>
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

export default AssistantDistributor