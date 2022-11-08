import React, { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ComposedChart
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
  let vd=props.vd
  let vs=parseInt(props.vs)
  let totalp=parseInt(vd.substring(0,2));
  if(vd.substring(2,3)=='1'){
    vs+=12;
  }
  let period=parseInt(vd.substring(0,2));
  let cliff=parseInt(vd.substring(2,3));
  console.log(cliff);
  if(vd.substring(2,3)=='1'){
    period-=12;
  }
  console.log(vs);
  let num=props.num
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
  let count=0;
  for(let i=0;i<data?.length;i++){
    if(i==data?.length-1){
      for(let j=data[i].n;j>=0;j--){
        if(data[i].key<vs){
        newdata.push({key:data[i].key,vp:0,price:data[i].price*num,name:data[i].name,n:j,month:data[i].month,year:data[i].year,md:data[i].md})
        }
        else if(data[i].key>vs+period){
        newdata.push({key:data[i].key,vp:data[i].price*num,price:data[i].price*num,name:data[i].name,n:j,month:data[i].month,year:data[i].year,md:data[i].md})
        }
        else {
          if(cliff==1&&data[i].key==vs){
            count=12;
          }
          else count++;
        newdata.push({key:data[i].key,vp:num*data[i].price*count/totalp,price:data[i].price*num,name:data[i].name,n:j,month:data[i].month,year:data[i].year,md:data[i].md})

        }
      }
    }
    else{
      for(let j=data[i].n;j>data[i+1].n;j--){
        if(data[i].key<vs){
          newdata.push({key:data[i].key,vp:0,price:data[i].price*num,name:data[i].name,n:j,month:data[i].month,year:data[i].year,md:data[i].md})
          }
          else if(data[i].key>vs+period){
          newdata.push({key:data[i].key,vp:data[i].price*num,price:data[i].price*num,name:data[i].name,n:j,month:data[i].month,year:data[i].year,md:data[i].md})
          }
          else {
            if(cliff==1&&data[i].key==vs){
              count=12;
            }
            else count++;
          newdata.push({key:data[i].key,vp:num*data[i].price*count/totalp,price:data[i].price*num,name:data[i].name,n:j,month:data[i].month,year:data[i].year,md:data[i].md})
  
          }
        }
    }
  }
  count=0;
  // while(newdata?.length>0&&newdata[0].n>47){newdata.shift()}
  for(let i=0;i<newdata.length;i++){
    let curr_month_no=newdata.length-i-1
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
    let ckey=cyear*12+cmonth+1;
    if(newdata?.length)
    newdata[i].key=ckey
    if(ckey<vs){
      if(newdata?.length)
      newdata[i].vp=0;
    }
    else if(ckey>vs+period){
      if(newdata?.length)
      newdata[i].vp=newdata[i].price
    }
    else{
      if(cliff==1&&ckey==vs){
        count=13;
      }
      else count++;
      if(newdata?.length)
      newdata[i].vp=newdata[i].price*count/totalp
    }
  }
  while(newdata?.length>0&&newdata[1].vp==0){
    if(cliff==1&&newdata[12].vp==0)
    newdata.shift()
    else if(cliff==0&&newdata[1].vp==0)
    newdata.shift()
    else break;
  }
  // while(newdata?.length>0&&newdata[newdata.length-1].key<vs+period){
  //   newdata.push(newdata[newdata.length-1])
  //   newdata[newdata.length-1].key=newdata[newdata.length-1].key+1
  //   if(count>totalp)count=totalp
  // }
  // vs+=period

  console.log(newdata);
  return (
    <ComposedChart
      width={900}
      height={400}
      data={newdata}
      margin={{
        top: 10,
        right: 30,
        left: 100,
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
      <Line type="monotone" dataKey="vp" stroke="#8884d8" strokeDasharray="5 5" />
    </ComposedChart>
  );
}
