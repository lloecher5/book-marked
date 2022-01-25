import axios from "axios";
import React, { useEffect, useState } from "react";

import "./Stats.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

const Stats = (props) => {
  const [books, setBooks] = useState([]);
  const token = localStorage.getItem("token");

  //get an arry with all the years when the books were read.
  const yearsWhenRead = books.map((book) => {
    return books.length > 0 ? book.date.split("-")[0] : "";
  });

  //create an array with just the unique years. Sort the array with the most recent year coming first
  const uniqueYears = [...new Set(yearsWhenRead)].sort().reverse();

  //create an empty object and use it to count how many books are read in each year.
  const countsObject = {};

  //loop through the array of all the years when the books were read
  for (let i = 0; i < yearsWhenRead.length; i++) {
    //if the year is not in the object, add the year and set the book count to 1.
    if (!countsObject.hasOwnProperty(yearsWhenRead[i])) {
      countsObject[yearsWhenRead[i]] = 1;
    } else {
      //if the year is already in the object, add to the book count.
      countsObject[yearsWhenRead[i]]++;
    }
  }

  //empty array that will store just the counts of the books per year. The array of just years is needed for the Chart
  const counts = [];

  // loop through object, and get all the counts into the array
  for (const count in countsObject) {
    counts.push(countsObject[count]);
  }

  //reverse the counts to match the labels on the chart. The ensures the most recent year will be on the far left of chart.
  counts.reverse();

  const chartData = {
    labels: uniqueYears,
    datasets: [
      {
        label: "Year",
        data: counts,
        backgroundColor: ["black", "black", "black"],
      },
    ],
  };

  useEffect(() => {
    axios
      .get("/api/v1/books", {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        setBooks(res.data);
      });
  }, [token]);

  return (
    <div className="stats">
      <h1>Your reading stats.</h1>
      <div className="bar-chart">
        <Bar
          style={{ height: "600px", width: "600px", margin: "0 auto" }}
          data={chartData}
          options={{
            plugins: {
              title: {
                display: true,
                text: "Number of Books Read by Year",
              },
              legend: {
                display: true,
                position: "bottom",
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      stepSize: 1.0,
                    },
                  },
                ],
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Stats;
