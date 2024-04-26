import React, { useEffect, useState,useRef } from 'react'
import Header from '../../component/Header'
import axios from 'axios'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


const ManagingDirector_view = () => {
  const [search, setSearch] = useState("");
  const [state, setState] = useState({
    empDetails: []
  });
  const [deletedEmpId, setDeletedEmpId] = useState("");
  const [deletedEmpPosition, setDeletedEmpPosition] = useState("");
  const [showResignedAlert, setShowResignedAlert] = useState(false);


 //pdf download function
const pdfRef = useRef();
const downloadPDF = () => {
  const input = pdfRef.current;
  html2canvas(input).then((Canvas) => {
    const imgData = Canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4', true);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = Canvas.width;
    const imgHeight = Canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save('employeeDetails.pdf');
  });
};
  useEffect(() => {
    axios.get("http://localhost:8000/empDetails/").then(res =>{
      if(res.data){
        setState({
          empDetails:res.data
        })
      }
    })
  }, [state]);

  
   useEffect(() => {
    const deletedEmployee = state.empDetails.filter(empDetails => empDetails.empID === deletedEmpId);
    if(deletedEmployee){
      setDeletedEmpId(deletedEmployee.empID);
      setDeletedEmpPosition(deletedEmployee.position);
      setShowResignedAlert(true);
    }else{
      setShowResignedAlert(false); 
    }
   }, [state]);
   
  const onDelete = (id) => {
    axios.delete(`http://localhost:8000/empDetails/delete/${id}`)
    .then((res) =>{
        
         axios.get("http://localhost:8000/empDetails/").then(res =>{
          if(res.data){
            setState({
              empDetails: res.data
            });
          }
        });
      }).catch((error) => {
        console.error("Error deleting employee", error);
      });
  };
 

  

  return (
    <>
      <div className="col">
        <Header dashboard={"Employee Management System"} setSearch={setSearch}/>
      </div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col py-3">
         
            <br/>
            {showResignedAlert &&  (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {deletedEmpId} Employee has been deleted from system and assign new employee for that  {deletedEmpPosition} Position.
          .                                                                       .                                                                             
                 <button type="button" class="close" data-dismiss="alert" aria-label="Close"  onClick={() => window.location.href = "../../pages/employee_manage/View"}>
             
              <span aria-hidden="true" onClick={() => setShowResignedAlert(false)}>&times;</span>
            </button>
          </div>
            )}   
           <div ref={pdfRef}>
        <h2 class="my-5 text-center">Employee Management Details</h2>
            {/* table */}
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Emp ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Date Of Birth</th>
                  <th scope="col">Address</th>
                  <th scope="col">Contact Number</th>
                  <th scope="col">Position</th>
                  <th scope="col">Department</th>
                  <th scope="col">Joined Date</th>
                </tr>
              </thead>
              <tbody>
                {state.empDetails.filter((empDetails) => {
                  return search.toLowerCase()===''
                  ? empDetails
                  : empDetails.empID.toLowerCase().includes(search);
                }).map((empDetails, index) => (
                    <tr key={index}>
                    <td>{empDetails.empID}</td>
                    <td>{empDetails.name}</td>
                    <td>{empDetails.dateOfBirth}</td>
                    <td>{empDetails.address}</td>
                    <td>{empDetails.contactNumber}</td>
                    <td>{empDetails.position}</td>
                    <td>{empDetails.department}</td>
                    <td>{empDetails.joinedDate}</td>
                    </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className='mt-5'>
            <button className='btn me-2'  style={{backgroundColor: "#c1b688 "}} type='submit'>
              <a href="./report"  style={{ textDecoration: 'none', color:'black',fontWeight:'bold'}}>Report</a>
            </button>
            <button className='btn ' style={{backgroundColor: "#c1b688 ",textDecoration:'none',color:'black'}}
             onClick={downloadPDF}>Download PDF</button>
             </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default ManagingDirector_view
