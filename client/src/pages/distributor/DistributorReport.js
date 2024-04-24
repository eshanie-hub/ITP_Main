import React, { useEffect, useState } from 'react'
import Header from '../../component/Header'
import axios from 'axios'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


const DistributorReport = () => {
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


    
    const calculatePercentage = (count, total) => {
      return ((count / total) * 100).toFixed(2);
    };
 

  // Categorize credit limits into ranges of $50,000
  const creditCategories = {};
  state.distributor.filter(distributor => {
    const creditLimit = distributor.creditLimit;
    const category = Math.floor(creditLimit / 50000) * 50000;
    creditCategories[category] = (creditCategories[category] || 0) + 1;
  });

// Calculate total distributors and percentages for each category
const totalDistributors = state.distributor.length;
const categoryPercentages = {};
const data = Object.keys(creditCategories).map(category => {
  const count = creditCategories[category];
  const percentage = parseFloat(calculatePercentage(count, totalDistributors));
  categoryPercentages[category] = percentage;
  return { name: `${category} - ${parseInt(category) + 49999}`, value: percentage };
});

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
  return (
    <>
    <div class="col">
        <Header dashboard={"Distributor Management System"} />
    </div>
    <div>
      <h4>Distributor Credit Limit Distribution</h4>
      <table class="table">
        <thead>
          <tr>
          <th scope="col">Credit Range</th>
          <th scope="col">Count</th>
          <th scope="col">Percentage</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(categoryPercentages).map((category, index) => (
            <tr key={index}>
              <td>Rs {category} - Rs {parseInt(category) + 49999}</td>
              <td> {creditCategories[category]}</td>
              <td>{categoryPercentages[category]}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col py-3">
            {state.distributor && state.distributor.length > 0 && (
                   <PieChart width={400} height={400}>
                     <Pie
                       data={data}
                       cx="50%"
                       cy="50%"
                       labelLine={false}
                       label={renderCustomizedLabel}
                       outerRadius={80}
                       fill="#8884d8"
                       dataKey="value"
                     >
                       {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
                     </Pie>
                   </PieChart>
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

export default DistributorReport