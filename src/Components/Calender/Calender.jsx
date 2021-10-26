import React, { useEffect, useRef, useState } from "react";
import { useThrotling } from "../../Customhook/useThrotling";
import Dateindicator from "../DateIndicator/Dateindicator";
import "./Calender.css";
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const Days = new Array(30).fill().map((_, idx) => 1 + idx);
export const Calender = () => {
  const d = new Date();

  let cycles = [


    {
        StartDate: "5",
        StartMonth: "February",
        EndDate: "5",
        EndMonth: "April",
      },
      {
        StartDate: "10",
        StartMonth: "September",
        EndDate: "26",
        EndMonth: "October",
      },
     {
        StartDate: "30",
        StartMonth: "October",
        EndDate: "25",
        EndMonth: "November",
      }
  ];

  return (
    <div className="container">
       <Dateindicator />
      <p>{d.getFullYear()}</p>
      <div className="years">
        {months.map((month, index) => {
          return (
            <div
              key={month}
              style={
                d.getMonth() === index ? { backgroundColor: "orange" } : {}
              }
              className="month"
            >
              {month}
            </div>
          );
        })}
      </div>
    
      <Field cycles={cycles} />
      <Field cycles={cycles} />
    </div>
  );
};

const Field = ({ cycles }) => {
 const [ all , setAll]=useState([])

 const handleSet=(data)=>{
   console.log(data);
   setAll([...data])
 }

 React.useEffect(() => {
   console.log(all);
 }, [all])
  return (
    <div className="Allfields">
      {cycles.map((draw, index) => {
        return (
          <div key={index} className="fields">
            {months.map((month, index) => {
              return <Area key={month + 1} handleSet={handleSet} Cycle={draw} month={month} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

const Area = (props) => {
  
  let startmonth = months.indexOf(props.Cycle.StartMonth);
  let lastmonth = months.indexOf(props.Cycle.EndMonth);
  let date = new Date();

  const Conditional = (month, day) => {
    let CurrentMonth = months.indexOf(month);

    if (CurrentMonth > startmonth && CurrentMonth < lastmonth) {
      return true;
    } else if (
      month === props.Cycle.StartMonth &&
      day >= props.Cycle.StartDate
    ) {
      return true;
    } else if (month === props.Cycle.EndMonth && day <= props.Cycle.EndDate) {
      return true;
    }
    return false
  };
  let Currentdate = date.getDate();
  let CurrentMonth = +date.toJSON().split("-")[1];

  const handleColor = () => {
    if (CurrentMonth >= startmonth + 1 && CurrentMonth <= lastmonth + 1 && Currentdate<=props.Cycle.EndDate && Currentdate>=props.Cycle.StartDate) {
      return "green";
    } else if (Currentdate<=props.Cycle.StartDate && CurrentMonth <= lastmonth + 1 ) {
      return "blue";
    } else {
      return "gray";
    }
  };

  
  const allRef= React.useRef([])
 
const currentDate=(e)=>{
let d= +date.toLocaleDateString().split("/")[0]
let monthIndex= months.indexOf(e.month)+1

if(d===monthIndex&& e.day===Currentdate){

  allRef.current= e
  console.log(allRef);
   localStorage.setItem("dateIndiactor",allRef.current.offsetLeft)
}
}

// React.useEffect(()=>{
//   console.log(allRef);
// })
const activeStyle={
  backgroundColor: handleColor(),

}
  
  return (
    <div className="field"  >
      {Days.map((day,index) => {
        return (
          <>
            {
            Conditional(props.month, day)? 
             <div
              ref={ (e)=>{
                e.day=day
                e.month=props.month
                currentDate(e)
              }} 
              key={day}
              style={ { backgroundColor: handleColor() } }
              className="days"
            ></div>:
            <div
              key={day}
              ref={ (e)=>{
                e.day=day
                e.month=props.month
                 currentDate(e)
              }} 
              className="days"
            ></div>
            } 
          </>
       
        );
      })}
    </div>
  );
};
