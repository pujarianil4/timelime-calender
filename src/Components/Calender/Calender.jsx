import React from "react";
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
        StartDate: "10",
        StartMonth: "January",
        EndDate: "5",
        EndMonth: "February",
      },
      {
        StartDate: "10",
        StartMonth: "September",
        EndDate: "24",
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
      <p>{d.getFullYear()}</p>
      <div className="years">
        {months.map((month, index) => {
          return (
            <div
              key={month}
              style={
                d.getMonth() === index ? { backgroundColor: "yellow" } : {}
              }
              className="month"
            >
              {month}
            </div>
          );
        })}
      </div>

      <Field cycles={cycles} />
      <Field cycles={cycles} />  <Field cycles={cycles} />
    </div>
  );
};

const Field = ({ cycles }) => {

  return (
    <div className="Allfields">
      {cycles.map((draw, index) => {
        return (
          <div key={index} className="fields">
            {months.map((month, index) => {
              return <Area key={month + 1} Cycle={draw} month={month} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

const Area = (props) => {
  console.log(props.Cycle);
  let startmonth = months.indexOf(props.Cycle.StartMonth);
  let lastmonth = months.indexOf(props.Cycle.EndMonth);
  let date = new Date();

  const Conditional = (month, day) => {
    let CurrentMonth = months.indexOf(month)+1;

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

  const handleColor = () => {
    let Currentdate = date.getDate();
    let CurrentMonth = +date.toJSON().split("-")[1];
    console.log(Currentdate, CurrentMonth, startmonth + 1, lastmonth + 1);

    if (CurrentMonth >= startmonth + 1 && CurrentMonth <= lastmonth + 1 && Currentdate<=props.Cycle.EndDate && Currentdate>=props.Cycle.StartDate) {
      return "green";
    } else if (Currentdate<=props.Cycle.StartDate && CurrentMonth <= lastmonth + 1 ) {
      return "blue";
    } else {
      return "gray";
    }
  };

  handleColor();
  return (
    <div className="field">
      {Days.map((day) => {
        return (
          <div
            key={day}
            style={
              Conditional(props.month, day)
                ? { backgroundColor: handleColor() }
                : {}
            }
            className="days"
          ></div>
        );
      })}
    </div>
  );
};
