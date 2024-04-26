import React, { useEffect, useState, useRef }  from 'react'
import Header from '../../component/Header';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const View = () => {
  const [search, setSearch] = useState("");
  const [state, setState] = useState({
    empDetails: []
  })
 
    useEffect(() => {
        axios.get("http://localhost:8000/empDetails/").then(res =>{
            if(res.data){
              setState({
                empDetails:res.data
              })
            }
        })
    }, [state]);

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


  return (
    <>
    <div class="col">
        <Header dashboard={"Employee Management System"} setSearch={setSearch} />
    </div>
    <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col py-3">
      <div ref={pdfRef}>
        <h2 class="my-5 text-center">Employee Management Details</h2>
          
         {/* details */}
         <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Emp Id</th>
                    <th scope="col">Emp Name</th>
                    <th scope="col">Date Of Birth</th>
                    <th scope="col">Address</th>
                    <th scope="col">Contact Number</th>
                    <th scope="col">Position</th>
                    <th scope="col">Department</th>
                    <th scope="col">joined Date</th>
                    </tr>
                </thead>
                <tbody>
                {state.empDetails.filter((empDetails) => {
                  return search.toLowerCase()===''
                  ? empDetails
                  : empDetails.empID.toLowerCase().includes(search);
                })
                
                .map((empDetails, index) => (
                    <tr key={index}>
                    <td>{empDetails.empID}</td>
                    <td>{empDetails.name}</td>
                    <td>{empDetails.dateOfBirth}</td>
                    <td>{empDetails.address}</td>
                    <td>{empDetails.contactNumber}</td>
                    <td>{empDetails.position}</td>
                    <td>{empDetails.department}</td>
                    <td>{empDetails.joinedDate}</td>
                    <td>
                    </td>
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

export default View