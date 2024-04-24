import React,{ useEffect, useState } from 'react'
import Header from '../../component/Header'
import { PieChart, Pie} from 'recharts';
import axios from 'axios';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';

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

// Array of colors for each department
 const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f0e', '#ff5500', '#8dd1e1', '#82ca9d']

 // Array of month names
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
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

//get extreact month from joined date
const getMonthFromDate = (date) =>{
  const monthPart = parseInt(date.substring(5,7))
  return monthPart  // Extract month component and convert to integer
}

//calculate employee count for each month
const monthCount = state.empDetails.reduce((counts,empDetails) =>{
  const month = getMonthFromDate(empDetails.joinedDate)
  counts[month] = (counts[month]|| 0) +1
  return counts;
},{})

//convert monthly counts to an array of objects for rechart data
const data = Object.keys(monthCount).map((month) => ({
  Month :monthNames[ parseInt(month)- 1],
  EmployeeCount:monthCount[month]
}))

  return (
    <>
    <div class="col">
        <Header dashboard={"Employee Management System"} />
    </div>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col py-3">
            Employee manager Report

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
                <PieChart width={500} height={300}>
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

          {state.empDetails && state.empDetails.length > 0 && (
              <div>
        <LineChart
          width={500}
          height={300}
          data={data}
          
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Month"/>
          <YAxis  />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="EmployeeCount" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
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

export default Employee_Report