import React, { useEffect, useState, useRef } from 'react';
import Header from '../../component/Header';
import axios from 'axios';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

const Payment_report = () => {
  const [customerData, setCustomerData] = useState([]);
  const [search, setSearch] = useState('');
  const chartRef = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const orderPlacementRes = await axios.get(
          `http://localhost:8000/order_placement/`
        );
        const filteredOrders = orderPlacementRes.data.filter(
          (order) => order.orderType === 'credit' && order.orderStatus === 'approved'
        );
        const customerNames = [...new Set(filteredOrders.map((order) => order.customerName))];
        const customerData = await Promise.all(
          customerNames.map((customerName) =>
            getCustomerData(customerName, filteredOrders)
          )
        );
        setCustomerData(customerData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, [search]);

  const getCustomerData = async (customerName, orderPlacementData) => {
    try {
      const orderPlacementRes = orderPlacementData.filter(
        (order) => order.customerName === customerName
      );
      const paymentRes = await axios.get(
        `http://localhost:8000/payment/?customerName=${customerName}`
      );
      let totalCredit = 0;
      let totalPayment = 0;
      orderPlacementRes.forEach((order_placement) => {
        totalCredit += order_placement.amount;
      });
      paymentRes.data.filter(payment => payment.CustomerName === customerName && (search.toLowerCase() === '' || payment.CustomerName.toLowerCase().includes(search)))
        .forEach((payment) => {
          totalPayment += payment.Payment;
        });
      return {
        customerName: customerName,
        totalCreditLimit: totalCredit,
        totalPaymentAmount: totalPayment,
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        customerName: customerName,
        totalCreditLimit: 0,
        totalPaymentAmount: 0,
      };
    }
  };

  const handleDownloadPDF = () => {
    const chart = chartRef.current;
    html2canvas(chart)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('payment_report.pdf');
      });
  };

  return (
    <>
      <div className="col">
        <Header dashboard={'Customer Payment History System'} />
      </div>
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col py-3" >
            <div ref={chartRef}>
              <h3 className="mb-4"><center>Customer Payment History Details</center></h3>
              <div className="mt-3 mb-3"></div>
              <div >
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart
                    width={500}
                    height={400}
                    data={customerData}
                    margin={{
                      top: 20,
                      right: 20,
                      left: 20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="customerName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalCreditLimit" fill="#4B382D" name="Total Credit Limit" />
                    <Bar dataKey="totalPaymentAmount" fill="#D0AF8F" name="Total Payment Amount" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button className='btn' style={{ backgroundColor: "#c1b688", height: "38px" }} type='submit'>
                <a href="./CreditManager_view" style={{ textDecoration: 'none', color: 'black' }}>Back</a>
              </button>
              <div className='mt-5'>
                <button className='btn' onClick={handleDownloadPDF} style={{ backgroundColor: "#c1b688" }}>Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment_report;
