import React, { useEffect, useState } from 'react'
import Header from '../../component/Header';
import {  PieChart, Pie} from 'recharts';
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Inventory_report = () => {
  const [state, setState] = useState({
    inventory: []
  })
  useEffect(() => {
    axios.get("http://localhost:8000/inventory/").then(res =>{
        if(res.data){
          setState({
            inventory:res.data
          })
        }
    })
}, [state]);


  return (
    <>
    <div class="col">
        <Header dashboard={"Inventory Management System"} />
    </div>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col py-3">
        
        
        {state.inventory && state.inventory.length > 0 && (
          <div>
            <BarChart
          width={500}
          height={300}
          data={state.inventory}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="itemName" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="stockCount" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="reorderPoint" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </div>
        )}
         
          
          
      
        
      
            <button className='btn btn-primary mt-5' type='submit'>
            <a href="./ManagingDirector_view"  style={{textDecoration: 'none', color:'white'}}>Back</a>
            </button>
        </div>
        </div>
      </div>
    </>
  )
}

export default Inventory_report