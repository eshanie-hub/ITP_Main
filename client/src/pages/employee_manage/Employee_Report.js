import React,{ useEffect, useState,useRef } from 'react'
import Header from '../../component/Header'
import { PieChart, Pie} from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const Employee_Report = () => {

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

//Report download function
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
    pdf.save('employeeReport.pdf');
  });
};

// Array of colors for each department
 const COLORS = ['#4363d8 ', '#3cb44b', '#f032e6', '#911eb4', '#469990', '#f58231', '#42d4f4']


 //Calculate employee count for each department
 const departmentCounts = state.empDetails.reduce((counts,empDetails) =>{
  const department = empDetails.department
  counts[department] = (counts[department] || 0)+1
  return counts
 },{})

 // Convert department counts to an array of objects for recharts data
 const departmentData = Object.keys(departmentCounts).map((department,index) => ({
  Department: department,
  EmployeeCount: departmentCounts[department],
  fill: COLORS[index % COLORS.length] // Assign different colors for each department
}))



  return (
    <>
    <div class="col">
        <Header dashboard={"Employee Management System"} />
    </div>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col py-3">

            <div ref={pdfRef}>
        <h2 class="my-5 text-center">Employee Management Report</h2>

            {state.empDetails && state.empDetails.length > 0 && (
          <div>
            <BarChart 
          width={500}
          height={300}
          data={departmentData}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Department" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="EmployeeCount" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        
        </BarChart>
      </div>
        )}

     {state.empDetails && state.empDetails.length > 0 && (
              <div>
                <PieChart  width={500} height={300}>
                  <Pie
                    dataKey="EmployeeCount"
                    nameKey= "Department"
                    isAnimationActive={false}
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#82ca9d"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              </div>
            )}

          </div>

          <div className='mt-5'>
            <button className='btn me-2' style={{backgroundColor: "#c1b688 "}} type='submit'>
            <a href="./ManagingDirector_view" style={{backgroundColor: "#c1b688 ", textDecoration: 'none', color:'black',fontWeight:'bold'}}>
              Back</a>
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

export default Employee_Report