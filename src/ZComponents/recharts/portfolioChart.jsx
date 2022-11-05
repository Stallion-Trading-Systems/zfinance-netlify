import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
const month = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
const data = [
  {
    name:"Series_A",
    date:"05-11-2022",
    price:"1000"
  },
  {
    name:"Series_B",
    date:"05-11-2022",
    price:"600"
  },
  {
    name:"Series_C",
    date:"05-11-2022",
    price:"550"
  },
  {
    name:"Series_D",
    date:"05-11-2022",
    price:"500"
  },
  {
    name:"Series_E",
    date:"05-11-2022",
    price:"400"
  },
  {
    name:"Series_F",
    date:"05-11-2022",
    price:"300"
  },
  {
    name:"Series_G",
    date:"05-11-2022",
    price:"100"
  }
];
data.reverse()

for(let i=0;i<data.length;i++){
    let currdate=data[i].date;
    let m=currdate.substring(3,5)
    let y=currdate.substring(8,10)
    let d=month[m-1]+" "+y;
    data[i].md=d;
}

export default function portfolioChart() {
  return (
    <AreaChart
      width={700}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="md" />
      <YAxis />
      <Tooltip />
      {/* <Area
        type="monotone"
        dataKey="uv"
        stackId="1"
        stroke="#8884d8"
        fill="#8884d8"
      />
      <Area
        type="monotone"
        dataKey="pv"
        stackId="1"
        stroke="#82ca9d"
        fill="#82ca9d"
      /> */}
      <Area
        type="monotone"
        dataKey="price"
        stackId="1"
        stroke="lightgreen"
        fill="#C9F0B1"
      />
    </AreaChart>
  );
}
