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
  
    const [search, setSearch] = useState("");
        // console.log(search);
        
    const [expiredAgreements, setExpiredAgreements] = useState([]);
        //check expired agreement
    useEffect(() => {
      const currentDate = new Date();
        
      const expired = state.distributor.filter(distributor => {
        const signedDateObj = new Date(distributor.date);
        const expirationDate = new Date(signedDateObj.setFullYear(signedDateObj.getFullYear() + 2));
        return expirationDate < currentDate;
      });
        
          setExpiredAgreements(expired);
          if (expired.length > 0) {
            setNotification(`Found ${expired.length} expired agreements.`);
          } else {
            setNotification('No expired agreements found.');
          }
         }, [state]);

    const [notification, setNotification] = useState(null); // State for notification message
    const Notification = ({ message }) => {
          return (
            <div className="notification">
              {message}
            </div>
          );
        };
          
  return (
    <>
    <div class="col">
        <Header dashboard={"Distributor Management System"} setSearch={setSearch}/>
    </div>
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong><h2>Expired Agreements</h2></strong> 
    <div>
     
      {notification && <Notification message={notification} />} {/* Render the Notification component */}
      <ul>
        {expiredAgreements.map(distributor => (
          <li key={distributor.distributorId}>{distributor.distributorName} - Signed on {distributor.date}</li>
        ))}
      </ul>
    </div>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
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
                    <button type="button" class="btn btn-sm" style={{backgroundColor: "#596584 "}} >
                        <a href={`/pages/distributor/edit/${distributor._id}`} style={{textDecoration: 'none', color:'white'}}>
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
            <a href="./add"  style={{textDecoration: 'none', color:'white'}}>Add Distributor</a>
      </button>
        </div>
        </div>
    </div>
    </>
  )
}

export default AssistantDistributor