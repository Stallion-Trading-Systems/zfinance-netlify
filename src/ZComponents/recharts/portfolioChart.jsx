import React, { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
const month = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
const datac = [
  {
    name: "Series_A",
    date: "05-11-2022",
    price: "1000"
  },
  {
    name: "Series_B",
    date: "05-11-2022",
    price: "600"
  },
  {
    name: "Series_C",
    date: "05-11-2022",
    price: "550"
  },
  {
    name: "Series_D",
    date: "05-11-2022",
    price: "500"
  },
  {
    name: "Series_E",
    date: "05-11-2022",
    price: "400"
  },
  {
    name: "Series_F",
    date: "05-11-2022",
    price: "300"
  },
  {
    name: "Series_G",
    date: "05-11-2022",
    price: "100"
  }
];


export default function portfolioChart(props) {
  let data = props.data
  var newdata=[]
  let aajdate=new Date().getFullYear() 
  let aajyear=aajdate
  let aajmonth=new Date().getMonth()
  aajdate-=2000
  aajdate*=12
  aajdate+=aajmonth
  for (let i = 0; i < data?.length; i++) {
    let currdate = data[i].date;
    let m = currdate.substring(5, 7)
    let y = currdate.substring(2, 4)
    let d = month[m - 1] + " " + y;
    let nn=m+y;
    data[i].md = d;
    data[i].month=parseInt(m)
    data[i].year=parseInt(y)
    let yint=(parseInt(y)*12)+parseInt(m)
    data[i].key=yint
    data[i].n=aajdate-yint+1;
  }
  for(let i=0;i<data?.length;i++){
    if(i==data?.length-1){
      for(let j=data[i].n;j>=0;j--){
        newdata.push({price:data[i].price,name:data[i].name,n:j,month:data[i].month,year:data[i].year,md:data[i].md})
      }
    }
    else{
      for(let j=data[i].n;j>data[i+1].n;j--){
        newdata.push({price:data[i].price,name:data[i].name,n:j,month:data[i].month,year:data[i].year,md:data[i].md})
      }
    }
  }
  while(newdata?.length>0&&newdata[0].n>59){newdata.shift()}
  for(let i=0;i<60;i++){
    let curr_month_no=59-i
    let bmonth=curr_month_no%12
    let byear=Math.floor(curr_month_no/12)

    let cmonth=aajmonth
    let cyear=aajyear-2000
    if(bmonth>cmonth){
      cmonth+=12
      cmonth-=bmonth
      cyear--
    }
    else{
      cmonth-=bmonth
    }
    cyear-=byear

    let d = month[cmonth] + " " + cyear;

    if(newdata?.length)
    newdata[i].md=d


  }
  // console.log(newdata);
  return (
    <AreaChart
      width={700}
      height={400}
      data={newdata}
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
