import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';
import axios from 'axios';

const View = () => {
  const [search, setSearch] = useState("");
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
                    <th scope="col">distributor Id</th>
                    <th scope="col">distributor Name</th>
                    <th scope="col">phoneNo</th>
                    <th scope="col">credit Limit</th>
                    <th scope="col">agreement Status</th>
                    <th scope="col">date</th>
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