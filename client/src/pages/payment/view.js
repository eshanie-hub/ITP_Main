import React, { useEffect, useState } from 'react'
import Header from '../../component/Header';
import axios from 'axios'

const View = () => {
  const [search, setSearch] = useState("");
  const [state, setState] = useState({
    payment: []
  })

useEffect(() => {
    axios.get("http://localhost:8000/payment/").then(res =>{
        if(res.data){
          setState({
            payment:res.data
          })
        }
      })
    }, [state]);
  
  
    const onDelete = (id) => {
      axios.delete(`http://localhost:8000/payment/delete/${id}`)
      .then((res) => {
        alert("Deleted successfully");
        
      })
    }
    
  return (
    <>
      <div class="col">
          <Header dashboard={"Customer Payment History System"} setSearch={setSearch} />
      </div>
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col py-3">
           {/* details */}
           <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Order No</th>
                    <th scope="col">Payment Id </th>
                    <th scope="col">Date</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Payment</th>
                    
                    
                    </tr>
                </thead>
                <tbody>
                {state.payment.filter((payment) => {
                  return search.toLowerCase()===''
                  ? payment
                  : payment.CustomerName.toLowerCase().includes(search);
                })
                
                
                
                .map((payment, index) => (
                    <tr key={index}>
                    <td>{payment.OrderNo}</td>
                    <td>{payment.PaymentId}</td>
                    <td>{payment.Date}</td>
                    <td>{payment.CustomerName}</td>
                    <td>{payment.Payment}</td>
                
                    <td>
                    <div class="d-grid gap-2">
                    <button type="button" class="btn btn-success btn-sm">
                        <a href={`/pages/payment/edit/${payment._id}`} style={{textDecoration: 'none', color:'white'}}>
                            update
                        </a>
                    </button>
                    <button type="button" class="btn btn-danger btn-sm" onClick={() => onDelete(payment._id)}>Delete</button>
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