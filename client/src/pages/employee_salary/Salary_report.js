import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import axios from 'axios';

const Salary_report = () => {
  const [salaryData, setSalaryData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/salary/").then(res => {
      if (res.data) {
        setSalaryData(res.data);
      }
    });
  }, []);

  // Calculate total values for BasicSalary, Bonus, Tax, and NetSalary
  const totalBasicSalary = salaryData.reduce((acc, curr) => acc + curr.BasicSalary, 0);
  const totalBonus = salaryData.reduce((acc, curr) => acc + curr.Bonus, 0);
  const totalTax = salaryData.reduce((acc, curr) => acc + curr.Tax, 0);
  const totalNetSalary = salaryData.reduce((acc, curr) => acc + curr.NetSalary, 0);

  // Data for the pie chart
  const data = [
    { name: 'Basic Salary', value: totalBasicSalary },
    { name: 'Bonus', value: totalBonus },
    { name: 'Tax', value: totalTax },
    { name: 'Net Salary', value: totalNetSalary }
  ];

  // Color palette for the pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <>
      <div className="col">
        <Header dashboard={"Employee Salary Management System"} />
      </div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col py-3">
            <h2>Employee Salary Report</h2>
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {
                  data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
              <Tooltip />
            </PieChart>
            <button className='btn btn-primary mt-5' type='submit'>
              <a href="./Operator_view" style={{ textDecoration: 'none', color: 'white' }}>Back</a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Salary_report;