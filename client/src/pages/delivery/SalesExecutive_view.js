import React, { useEffect, useState } from 'react'
import Header from '../../component/Header';
import axios from 'axios';


const SalesExecutive_view = ()  => {
  const [search, setSearch] = useState("");
  const [state, setState] = useState({
    delievery: []
});

const [showAlert, setShowAlert] = useState(false);
const [updatedOrderId, setUpdatedOrderId] = useState("");

useEffect(() => {
    axios.get("http://localhost:8000/delievery/").then(res =>{
        if(res.data){
          setState({
            delievery:res.data
          })
        }
      })
    }, [state]);

    useEffect(() => {
      const deliveredDeliveries = state.delievery.filter(delievery => delievery.DeliveryStatus === "Delivered");
      if (deliveredDeliveries.length > 0) {
        setShowAlert(true);
        // Set the updated order id when the delivery status is updated
        setUpdatedOrderId(deliveredDeliveries[0].OrderNo);
      }
    }, [state]);
  
    // check delivery
    const markAsDelivered = (id) => {
      axios.put(`http://localhost:8000/delivery/${id}`, { delivered: true })
      .then((_res) => {
        alert("Delivery marked as delivered.");
        // Refresh delivery list after marking as delivered
        axios.get("http://localhost:8000/delivery/").then(res =>{
          if(res.data){
            setState({
              delivery: res.data
            });
          }
        });
      })
        .catch((error) => {
          console.error("Error marking delivery as delivered:", error);
        });
    };
  
  return (
    <>
      <div class="col">

          <Header dashboard={"Delivery Management"} setSearch={setSearch}/>

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
                    <div className="d-grid gap-2">
                        {!delievery.DeliveryStatus && (
                          <button className="btn btn-success mt-5" type="button" onClick={() => markAsDelivered(delievery._id)}>
                            Delivered
                          </button>
                        )}
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

export default SalesExecutive_view