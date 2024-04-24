import React, { useEffect, useRef, useState } from 'react'
import Header from '../../component/Header'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import axios from 'axios';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from 'recharts';






const Report = () => {
  const [state, setState] = useState({
    order_placement: []
  })
  useEffect(() => {
    axios.get("http://localhost:8000/order_placement/").then(res =>{
        if(res.data){
          setState({
            order_placement:res.data
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
    pdf.save('orderReport.pdf');
  });
};


  


  return (
    <>
    <div class="col">

        <Header dashboard={"Order Placement System"} />

    </div>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col py-3">
        <div ref={pdfRef}>
        <h2 class="my-5 text-center">Order Amount Report</h2>
             <PieChart width={400} height={400}>
          <Pie
            dataKey="amount"
            isAnimationActive={false}
            data={state.order_placement}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#ff8000"
            label
          nameKey="customerName"
          />
          
          <Tooltip />
        </PieChart>
        </div>
<div className='mt-5'>
            <button className='btn me-2 ' style={{backgroundColor: "#c1b688"}} type='submit'>
            <a href="./ManagingDirector_view"  style={{textDecoration: 'none', color:'black'}}>Back</a>
            </button>
            <button className='btn  ' style={{backgroundColor: "#c1b688"}} onClick={downloadPDF}>Download PDF</button>
            </div>
        </div>

        </div>
      </div>
     
    </>
  )
}

export default Report