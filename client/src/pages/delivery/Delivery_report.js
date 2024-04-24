import React, { useEffect, useState } from 'react';
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

const Delivery_report = () => {
  const [deliveryData, setDeliveryData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/delievery/")
      .then(res => {
        if (res.data) {
          setDeliveryData(res.data);
        }
      })
      .catch(error => {
        console.error('Error fetching delivery data:', error);
      });
  }, []); // Empty dependency array to execute once on component mount

  return (
    <>
      <div className="col">
        <Header dashboard={"Delivery Management System"} />
      </div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col py-3">
            {deliveryData.length > 0 && (
              <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                  <ComposedChart
                    width={500}
                    height={400}
                    data={deliveryData}
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

            <button className="btn btn-primary mt-5" type="submit">
              <a href="./Operator_view" style={{textDecoration: 'none', color: 'white' }}> Back </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Delivery_report;
