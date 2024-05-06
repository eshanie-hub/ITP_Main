import React, { useEffect, useState} from 'react';
import Header from '../../component/Header'
import View from './view';
import axios from 'axios';



const Operator_view = () => {

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
          delievery: res.data
        });
      }
    });
  }, [state]);

  useEffect(() => {
    const deliveredDeliveries = state.delievery.filter(delievery => delievery.DeliveryStatus === "Delivered");
    if (deliveredDeliveries.length > 0) {
      setShowAlert(true);
      // Set the updated order id when the delivery status is updated
      setUpdatedOrderId(deliveredDeliveries[0].OrderNo);
    }
  }, [state]);
  const onDelete = (id) => {
    axios.delete(`http://localhost:8000/delievery/delete/${id}`)
      .then(() => {
        alert("Deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting delivery:", error);
      });
  };

  return (
    <>
      <div className="col">
        <Header dashboard={"Delivery Management"} setSearch={setSearch} />
      </div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col py-3">

            

          {showAlert && (
  <div style={{ backgroundColor: '#c1b688', color: '#fff' }} role="alert">
    The order with orderId {updatedOrderId} is marked as delivered.
  </div>
)}

            <table className="table table-striped">
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
                {state.delievery.filter((delivery) => {
                  return search.toLowerCase()===''
                    ? delivery
                    : delivery.OperatorName.toLowerCase().includes(search);
                }).map((delivery, index) => (
                  <tr key={index}>
                    <td>{delivery.SalesExecutiveName}</td>
                    <td>{delivery.OperatorName}</td>
                    <td>{delivery.OrderNo}</td>
                    <td>{delivery.Amount}</td>
                    <td>{delivery.DeliveryStatus}</td>
                    <td>
                      <div className="d-grid gap-2">
                        <button type="button" className="btn btn-sm" style={{backgroundColor: "#596584"}}>
                          <a href={`/pages/delivery/edit/${delivery._id}`} style={{textDecoration: 'none', color:'white'}}>
                            Update
                          </a>
                        </button>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => onDelete(delivery._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>

                  
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <button className='btn mt-5' style={{backgroundColor:"#c1b688"}} type='submit'>
            <a href="./Delivery_report"  style={{textDecoration: 'none', color:'white'}}>Report</a>
      </button>
    
    </>
  );
}
export default Operator_view