import React, { useEffect, useState } from 'react'
import Header from '../../component/Header';
import axios from 'axios';



const View = () => {
  const [search, setSearch] = useState("");
  const [state, setState] = useState({
    delievery: []
})

useEffect(() => {
    axios.get("http://localhost:8000/delievery/").then(res =>{
        if(res.data){
          setState({
            delievery:res.data
          })
        }
      })
    }, [state]);
  
  
    const onDelete = (id) => {
      axios.delete(`http://localhost:8000/delievery/delete/${id}`)
      .then((res) => {
        alert("Deleted successfully");
        
      })
    }

  return (
    <>
      <div class="col">

          <Header dashboard={"Delivery Management"} setSearch={setSearch} />

      </div>
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col py-3">
          <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Sales ExecutiveName</th>
                    <th scope="col">OperatorName </th>
                    <th scope="col">OrderNo</th>
                    <th scope="col">Amount</th>
                  <th scope="col">DeliveryStatus</th>
                    <th scope="col">Status</th>
                    
                    </tr>
                </thead>
                <tbody>
                {state.delievery.filter((delievery) => {
                  return search.toLowerCase()===''
                  ? delievery
                  : delievery.OperatorName.toLowerCase().includes(search);
                }).map((delievery, index) => (
                    <tr key={index}>
                    <td>{delievery.SalesExecutiveName}</td>
                    <td>{delievery.OperatorName}</td>
                    <td>{delievery.OrderNo}</td>
                    <td>{delievery.Amount}</td>
                    <td>{delievery.DeliveryStatus}</td>
                    
                    <td>
                    <div class="d-grid gap-2">
                    <button type="button" className="btn btn-sm" style={{backgroundColor: "#596584"}}>
                        <a href={`/pages/delivery/edit/${delievery._id}`} style={{textDecoration: 'none', color:'white'}}>
                            update
                        </a>
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" onClick={() => onDelete(delievery._id)}>Delete</button>
                    
                    </div>
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