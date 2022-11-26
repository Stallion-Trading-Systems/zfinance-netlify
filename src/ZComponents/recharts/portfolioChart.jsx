import React, { useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
  ComposedChart,
  Scatter
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
  let vd = props.vd
  let variables = props.variables
  let sensex=props.sensex
  let cd=props.cd
  // console.log(sensex);

  let vs = parseInt(props.vs)
  let totalp = parseInt(vd?.substring(0, 2));
  if (vd?.substring(2, 3) == '1') {
    vs += 12;
  }
  let period = parseInt(vd?.substring(0, 2));
  let totalperiod=period
  let cliff = parseInt(vd?.substring(2, 3));
  if (vd?.substring(2, 3) == '1') {
    period -= 12;
  }
  let num = props.num
  var newdata = []
  let aajdate = new Date().getFullYear()
  let aajyear = aajdate
  let aajmonth = new Date().getMonth()
  aajdate -= 2000
  aajdate *= 12
  aajdate += aajmonth
  for (let i = 0; i < data?.length; i++) {
    let currdate = data[i].date;
    let m = currdate?.substring(5, 7)
    let y = currdate?.substring(2, 4)
    let d = month[m - 1] + " " + y;
    let nn = m + y;
    data[i].md = d;
    data[i].month = parseInt(m)
    data[i].year = parseInt(y)
    let yint = (parseInt(y) * 12) + parseInt(m)
    data[i].key = yint
    data[i].n = aajdate - yint + 1;
  }
  // console.log(props);
  let count = 0;
  for (let i = 0; i < data?.length; i++) {
    if (i == data?.length - 1) {
      for (let j = data[i].n; j >= 0; j--) {
        if (data[i].key < vs) {
          newdata.push({ key: data[i].key, vp: 0, price: data[i].price * num, name: data[i].name, n: j, month: data[i].month, year: data[i].year, md: data[i].md })
        }
        else if (data[i].key > vs + period) {
          newdata.push({ key: data[i].key, vp: data[i].price * num, price: data[i].price * num, name: data[i].name, n: j, month: data[i].month, year: data[i].year, md: data[i].md })
        }
        else {
          if (cliff == 1 && data[i].key == vs) {
            count = 12;
          }
          else count++;
          newdata.push({ key: data[i].key, vp: num * data[i].price * count / totalp, price: data[i].price * num, name: data[i].name, n: j, month: data[i].month, year: data[i].year, md: data[i].md })

        }
      }
    }
    else {
      for (let j = data[i].n; j > data[i + 1].n; j--) {
        if (data[i].key < vs) {
          newdata.push({ key: data[i].key, vp: 0, price: data[i].price * num, name: data[i].name, n: j, month: data[i].month, year: data[i].year, md: data[i].md })
        }
        else if (data[i].key > vs + period) {
          newdata.push({ key: data[i].key, vp: data[i].price * num, price: data[i].price * num, name: data[i].name, n: j, month: data[i].month, year: data[i].year, md: data[i].md })
        }
        else {
          if (cliff == 1 && data[i].key == vs) {
            count = 12;
          }
          else count++;
          newdata.push({ key: data[i].key, vp: num * data[i].price * count / totalp, price: data[i].price * num, name: data[i].name, n: j, month: data[i].month, year: data[i].year, md: data[i].md })

        }
      }
    }
  }
  count = 0;
  // console.log(newdata);

  for (let i = 0; i < newdata.length; i++) {
    let curr_month_no = newdata.length - i - 1
    let bmonth = curr_month_no % 12
    let byear = Math.floor(curr_month_no / 12)

    let cmonth = aajmonth
    let cyear = aajyear - 2000
    if (bmonth > cmonth) {
      cmonth += 12
      cmonth -= bmonth
      cyear--
    }
    else {
      cmonth -= bmonth
    }
    cyear -= byear

    let d = month[cmonth] + " " + cyear;

    if (newdata?.length)
      newdata[i].md = d
    let ckey = cyear * 12 + cmonth + 1;
    if (newdata?.length)
      newdata[i].key = ckey
    if (ckey < vs) {
      if (newdata?.length)
        newdata[i].vp = 0;
    }
    else if (ckey > vs + period) {
      if (newdata?.length)
        newdata[i].vp = newdata[i].price
    }
    else {
      if (cliff == 1 && ckey == vs) {
        count = 13;
      }
      else count++;
      if (newdata?.length)
        newdata[i].vp = newdata[i].price * count / totalp
    }
  }
  while (newdata?.length > 0 && newdata[1]?.vp == 0) {
    if (cliff == 1 && newdata[12]?.vp == 0)
      newdata.shift()
    else if (cliff == 0 && newdata[1].vp == 0)
      newdata.shift()
    else break;
  }
  let currentyearkey
  let finalprice
  if (newdata.length) {
    currentyearkey = newdata[newdata.length - 1].key
    finalprice = newdata[newdata.length - 1].price
  }
  let finalorprice
  if (data) {
    finalorprice = data[data.length - 1]?.price
  }
  let finalyearkey = vs + period

  for (let i = currentyearkey; i <= finalyearkey - 2; i++) {
    let imonth = i % 12
    let iyear = Math.floor(i / 12)

    let imd = month[imonth] + " " + iyear
    // console.log(imd);
    count++
    let ivp = finalorprice * count / totalp * num
    if (ivp > finalprice)
      ivp = finalprice

    newdata.push({ key: i+1, vp: ivp, price: finalprice, name: i, n: i, month: imonth, year: iyear, md: imd })

  }
  for (let i = 0; i < newdata.length; i++) {
    if (newdata[i].key == aajdate + 1) {
      newdata[i].vpt = newdata[i].vp
      break;
    }
  }
  // console.log(newdata);
  // console.log(finalyearkey - 2);
  if (variables?.time_to_ipo && variables?.ipo_price && variables?.lock_in) {
    if ((parseInt(aajdate) + parseInt(variables?.time_to_ipo)) <= (finalyearkey - 2)) {
      // console.log("ok");
      if (newdata?.length){
        for(let i=0;i<newdata?.length;i++){
          if(newdata[i]?.key>=(parseInt(aajdate) + parseInt(variables?.time_to_ipo))){
            // newdata.push({ key: newdata[i]?.key, vp: newdata[i]?.vp*variables?.ipo_price * num/newdata[i]?.price, price: variables?.ipo_price * num, name: newdata[i]?.name, n: newdata[i]?.n + 1, month: newdata[i]?.month, year: newdata[i]?.year, md: newdata[i]?.imd })
            newdata[i].vp=newdata[i]?.vp*variables?.ipo_price * num/newdata[i]?.price
            newdata[i].price=variables?.ipo_price * num 
          }
        }
      }
    }
    else {
      if (newdata.length) {
        for (let currkey = finalyearkey + 1; currkey < (parseInt(aajdate) + parseInt(variables?.time_to_ipo)) - 2; currkey++) {
          // console.log(currkey);
          let i = currkey + 2
          let imonth = i % 12
          let iyear = Math.floor(i / 12)
          let imd = month[imonth] + " " + iyear
          newdata.push({ key: currkey, vp: newdata[newdata.length - 1]?.vp, price: newdata[newdata.length - 1]?.price, name: newdata[newdata.length - 1]?.name, n: newdata[newdata.length - 1]?.n + 1, month: imonth, year: iyear, md: imd })
        }
      }
      let i = parseInt(aajdate) + parseInt(variables?.time_to_ipo)
      // console.log("i", i);
      // console.log(newdata);
      let imonth = i % 12
      let iyear = Math.floor(i / 12)
      let imd = month[imonth] + " " + iyear
      if (variables?.lock_in == 0) {
        newdata.push({ key: (parseInt(aajdate) + parseInt(variables?.time_to_ipo)) - 2, vp: variables?.ipo_price * num, price: variables?.ipo_price * num, name: newdata[newdata.length - 1]?.name, n: newdata[newdata.length - 1]?.n + 1, month: imonth, year: iyear, md: imd })
      }
      else
        newdata.push({ key: (parseInt(aajdate) + parseInt(variables?.time_to_ipo)) - 2, vp: newdata[newdata.length - 1]?.vp, price: variables?.ipo_price * num, name: newdata[newdata.length - 1]?.name, n: newdata[newdata.length - 1]?.n + 1, month: imonth, year: iyear, md: imd })

      for (let currkey = parseInt(aajdate) + parseInt(variables?.time_to_ipo) - 1; currkey < parseInt(aajdate) + parseInt(variables?.time_to_ipo) + parseInt(variables?.lock_in) - 2; currkey++) {
        let i = currkey + 2
        let imonth = i % 12
        let iyear = Math.floor(i / 12)
        let imd = month[imonth] + " " + iyear
        newdata.push({ key: currkey, vp: newdata[newdata.length - 1]?.vp, price: newdata[newdata.length - 1]?.price, name: newdata[newdata.length - 1]?.name, n: newdata[newdata.length - 1]?.n + 1, month: imonth, year: iyear, md: imd })
      }
      for (let currkey = parseInt(aajdate) + parseInt(variables?.time_to_ipo) + parseInt(variables?.lock_in) - 2; currkey < parseInt(aajdate) + parseInt(variables?.time_to_ipo) + parseInt(variables?.lock_in) + 3; currkey++) {
        let i = currkey + 2
        if (variables?.lock_in == 0) i = currkey + 3
        let imonth = i % 12
        let iyear = Math.floor(i / 12)
        let imd = month[imonth] + " " + iyear
        newdata.push({ key: currkey, vp: newdata[newdata.length - 1]?.price, price: newdata[newdata.length - 1]?.price, name: newdata[newdata.length - 1]?.name, n: newdata[newdata.length - 1]?.n + 1, month: imonth, year: iyear, md: imd })

      }
    }
  }
  let c=cd?.strike_price/totalperiod
  if(props?.type!="nifty"){
    sensex=sensex?.filter(value=>{return value.index_name==props?.type})
    let onebyn=0
    for(let i=0;i<newdata.length;i++){
      if(newdata[i].vp==0)continue;
      for(let j=0;j<sensex?.length;j++){
        if(newdata[i].key==sensex[j]?.key){
          onebyn+=(1/sensex[j]?.close_price)
          let finalsensex=onebyn*sensex[j]?.close_price*num*c
          newdata[i].sensex=Math.floor(finalsensex)
        }
      }
    }
    let i;
    for(i=1;i<newdata.length;i++){
      if(newdata[i-1]?.sensex){
        if(!newdata[i]?.sensex){
          newdata[i-1].psensex=[newdata[i-1]?.sensex,newdata[i-1]?.sensex]
          newdata[i-1].highsensex=newdata[i-1]?.sensex
          newdata[i-1].lowsensex=newdata[i-1]?.sensex
          newdata[i].highsensex=(Math.round(((newdata[i-1]?.sensex*1.0167+(c*num)) + Number.EPSILON) * 100) / 100)
          newdata[i].lowsensex=(Math.round(((newdata[i-1]?.sensex*1.0167+(c*num)) + Number.EPSILON) * 100) / 100)
          newdata[i].psensex=[newdata[i]?.highsensex,newdata[i]?.lowsensex]
          break;
        }
      }
    }
    i++
    for(;i<newdata.length;i++){
      newdata[i].highsensex=(Math.round(((newdata[i-1]?.highsensex*1.0167+(c*num)) + Number.EPSILON) * 100) / 100)
      newdata[i].lowsensex=(Math.round(((newdata[i-1]?.lowsensex*1.0056+(c*num)) + Number.EPSILON) * 100) / 100)
      newdata[i].psensex=[newdata[i].highsensex,newdata[i].lowsensex]
      
    }
  }
  // console.log(newdata);//100,000,000,000
  const DataFormater = (number) => {
    let s=number.toString()
    let ans=""
    for(let i=s.length-1;i>=0;i--){
      if(s.length-i-1!=0&&(s.length-i-1)%3==0)
      ans=","+ans
      ans=s[i]+ans
    }
    return ans

  }
  const CustomTooltip = ({ active, payload, label }) => {
    // console.log(payload[0]?.payload);
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p style={{maxWidth:"250px",backgroundColor:"rgba(255, 255, 255, 0.5)", padding:"10px",fontSize:"12px"}} className="label">Your vested equity value 
          in <strong>{label}</strong> should be <strong>₹{payload[0]?.payload?.vp}</strong>, however, if you’d 
          have invested the monthly vested sum in <strong>{props?.type}</strong> index fund, it 
          should have reaped approx. 
          <strong>₹{payload[0]?.payload?.highsensex||payload[0]?.payload?.sensex}</strong> value
          </p>
        </div>
      );
    }
  
    return null;
  };
  return (
    
    <ComposedChart
      width={800}
      height={400}
      data={newdata}
      margin={{
        top: 0,
        right: 0,
        left: 50,
        bottom: 25
      }}
    >
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis label={{ value: 'Timeline', position:"insideBottom",offset:-20 }} minTickGap={10}  dataKey="md" />
      <YAxis label={{ value: 'Total Equity Value',position:"left", angle: -90,offset:20}} tickFormatter={DataFormater} />
      {/* domain={['dataMin', dataMax => (Math.ceil((dataMax * 1.1)))]}, */}
      <Tooltip content={<CustomTooltip />} />
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
        stackId="2"
        stroke="lightgreen"
        fill="#C9F0B1"
      />
      <Area
        dataKey="psensex"
        stroke="#B8B8B8"
        fill="#B8B8B8"
      />
      <Line type="monotone" dataKey="vp" strokeWidth="3" stroke="#8884d8" strokeDasharray="5 10" dot={false} />
      <Line type="monotone" dataKey="sensex" strokeWidth="3" stroke="orange" strokeDasharray="5 10" dot={false} />
      <Scatter type="monotone" dataKey="vpt" fill="#8884d8" shape="dot" />
      
    </ComposedChart>
  );
}
