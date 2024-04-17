
import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'

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



const Payment_report = () => {
  const labels = ["January", "February", "March", "April", "May", "June", "July"]
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



  return (
    <>
      <div class="col">
          <Header dashboard={"Customer Payment History System"} />
      </div>
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col py-3">
            {state.payment && state.payment.length> 0 &&(
              <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <ComposedChart
            width={500}
            height={400}
            data={
             
              state.payment}
            
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="Date" scale="band" />
            <YAxis  dataKey="Payment"  />
            <Tooltip />
            <Legend />
           
            <Bar dataKey="Payment" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="Date" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
            )}
           
            <button className='btn btn-primary mt-5' type='submit'>
            <a href="./CreditManager_view"  style={{textDecoration: 'none', color:'white'}}>Back</a>
            </button>
            </div>
           
        </div>
      </div>
    </>
  )
}

export default Payment_report