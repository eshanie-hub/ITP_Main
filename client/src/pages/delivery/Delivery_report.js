import React, { useEffect, useState, useRef } from 'react';
import Header from '../../component/Header';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const Delivery_report = () => {
  const [state, setState] = useState({
    delievery: []
  })

  useEffect(() => {
    axios.get("http://localhost:8000/delievery/")
      .then(res => {
        if (res.data) {
          setState({
            delievery:res.data
          })
        }
      })
      
  }, [state]); 

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
      pdf.save('deliveryReport.pdf');
    });
  };

  return (
    <>
      <div className="col">
        <Header dashboard={"Delivery Management"} />
      </div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col py-3">
          <div ref={pdfRef}>
        <h2 class="my-5 text-center">Delivery schedule management report</h2>

            {state.delievery && 
            state.delievery.length> 0 &&(
              <div style={{ width: '100%', height: 300 }}>
                
                <ResponsiveContainer>
                  <ComposedChart
                    width={500}
                    height={400}
                    data={state.delievery}
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                    }}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="OrderNo" scale="band" />
                    <YAxis dataKey="Amount" />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="OrderNo" barSize={20} fill="#AA6C39" />
                    <Line type="monotone" dataKey="Amount" stroke="#2AAA8A" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            )}
            </div>
            <div className='mt-5'>
            <button className='btn me-2' style={{backgroundColor:"#c1b688"}} type='submit'>
            <a href="./Operator_view"  style={{textDecoration: 'none', color:'black'}}>Back</a>
            </button>
            <button className='btn' style={{backgroundColor:"#c1b688"}} onClick={downloadPDF}>Download PDF</button>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Delivery_report;
