import React from 'react'
import './Chart.css'
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";

const Chart = (props) => {
  function convertToTime(time, isUkr){
    let date = new Date(time)
    let month = date.getUTCMonth() + 1
    let year = date.getFullYear()
    let day = date.getUTCDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
      let result = isUkr? day.toString()+'.'+month.toString()+'.'+year.toString()+' '+hours.toString()+':'+minutes.toString() 
      : month.toString()+'.'+day.toString()+'.'+year.toString()+' '+hours.toString()+':'+minutes.toString() 
    //result = date
    return result
 } 
  const chartData = props.data;

  return (
    <div className="chart-container ataCard revenueCard">
    <Line
      data={{
        labels: chartData.map((data) => convertToTime(data.time,props.isUkr)),
        datasets: [
          {
            label: props.isEnglish ? "Balance" : "Баланс",
          data: chartData.map((data) => (data.bal*props.ethValue + props.usdt+ props.usdc )),
            backgroundColor: "rgb(158,158,158)",
            borderColor: "rgb(158,158,158)",
          },
        ],
      }}
      options={{
        elements: {
          line: {
            tension: 1,
          },
        },
        plugins: {
          title: {
            text: "",
          },
        },
        maintainAspectRatio: false
      }}
      width={"65%"}
    />
  </div>

  )
}

export default Chart