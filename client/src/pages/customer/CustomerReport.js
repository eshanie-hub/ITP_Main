import React, { useEffect, useRef, useState } from "react";
import Header from "../../component/Header";
import axios from "axios";
import Chart from "chart.js/auto";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CustomerReport = () => {
  const [feedbackTypeCount, setFeedbackTypeCount] = useState({});
  const [feedbackStatusCount, setFeedbackStatusCount] = useState({});
  const [loading, setLoading] = useState(true);

  const colorPalette = [
    "rgba(255, 99, 132, 0.5)",
    "rgba(54, 162, 235, 0.5)",
    "rgba(255, 206, 86, 0.5)",
    "rgba(75, 192, 192, 0.5)",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:8000/customercare/")
      .then((res) => {
        const countsType = {};
        const countsStatus = {};
        res.data.forEach((item) => {
          countsType[item.type] = (countsType[item.type] || 0) + 1;
          countsStatus[item.status] = (countsStatus[item.status] || 0) + 1;
        });
        setFeedbackTypeCount(countsType);
        setFeedbackStatusCount(countsStatus);
        setLoading(false);
        renderPieChart(countsType);
        renderBarChart(countsStatus);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const renderPieChart = (data) => {
    const ctx = document.getElementById("feedbackPieChart");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: "Feedback Type",
            data: Object.values(data),
            backgroundColor: colorPalette.slice(0, Object.keys(data).length),
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Feedback Distribution by Type", // Add your desired title here
            padding: {
              top: 10,
              bottom: 10,
            },
          },
          legend: {
            display: false,
          },
        },
      },
    });
  };

  const renderBarChart = (data) => {
    const barctx = document.getElementById("feedbackBarChart");
    new Chart(barctx, {
      type: "bar",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: "Feedback Status",
            data: Object.values(data),
            backgroundColor: colorPalette,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
        plugins: {
          title: {
            display: true,
            text: "Feedback Distribution by Status", // Add your desired title here
            padding: {
              top: 10,
              bottom: 10,
            },
          },
          legend: {
            display: false,
          },
        },
      },
    });
  };

  const renderFeedbackDistributionByType = () => {
    return (
      <div className="col-md-8">
        <h4>Feedback Distribution By Type</h4>
        <ul>
          {Object.keys(feedbackTypeCount).map((key, index) => (
            <li key={index}>
              <span
                className="legend-color"
                style={{
                  backgroundColor: colorPalette[index % colorPalette.length],
                  marginRight: "5px", // Add margin to separate color from text
                  display: "inline-block",
                  width: "10px", // Set width of color box
                  height: "10px", // Set height of color box
                }}
              ></span>{" "}
              {key}:{" "}
              {Math.round(
                (feedbackTypeCount[key] /
                  Object.values(feedbackTypeCount).reduce((a, b) => a + b, 0)) *
                  100
              )}
              %
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderFeedbackDistributionByStatus = () => {
    return (
      <div className="col-md-8">
        <h4>Feedback Distribution By Status</h4>
        <ul>
          {Object.keys(feedbackStatusCount).map((key, index) => (
            <li key={index}>
              <span
                className="legend-color"
                style={{
                  backgroundColor: colorPalette[index % colorPalette.length],
                  marginRight: "5px", // Add margin to separate color from text
                  display: "inline-block",
                  width: "10px", // Set width of color box
                  height: "10px", // Set height of color box
                }}
              ></span>{" "}
              {key}: {feedbackStatusCount[key]}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  //Report download function
  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((Canvas) => {
      const imgData = Canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = Canvas.width;
      const imgHeight = Canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("CustomerCareReport.pdf");
    });
  };

  return (
    <>
      <Header dashboard={"Customer Care System"} />
      <div className="container-fluid" ref={pdfRef}>
        <h3 className="text-center mt-2">Customer Care Report</h3>
        <div className="row mt-5">
          <div className="col-md-5">
            <br />
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div style={{ height: "280px", width: "280px", float: "left" }}>
                <canvas id="feedbackPieChart"></canvas>
              </div>
            )}
          </div>
          <div className="col-md-7 mt-5 ">
            {renderFeedbackDistributionByType()}
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-md-5">
            <div style={{ height: "400px", width: "400px", float: "left" }}>
              <canvas id="feedbackBarChart"></canvas>
            </div>
          </div>
          <div className="col-md-7">{renderFeedbackDistributionByStatus()}</div>
        </div>

        <div style={{ clear: "both" }}></div>
      </div>

      <button
        className="btn "
        type="button"
        style={{ backgroundColor: "#c1b688 " }}
        onClick={downloadPDF}
      >
        Download PDF
      </button>
    </>
  );
};

export default CustomerReport;
