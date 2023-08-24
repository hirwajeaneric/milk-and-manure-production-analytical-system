import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend
} from "recharts";

const data = [
    {
      name: "Jan",
      2022: 200,
      2023: 400,
      amt: 200
    },
    {
      name: "Feb",
      2022: 300,
      2023: 398,
      amt: 200
    },
    {
      name: "Mar",
      2022: 200,
      2023: 800,
      amt: 200
    },
    {
      name: "Apr",
      2022: 780,
      2023: 908,
      amt: 200
    },
    {
      name: "May",
      2022: 190,
      2023: 400,
      amt: 200
    },
    {
      name: "Jun",
      2022: 390,
      2023: 800,
      amt: 200
    },
    {
      name: "Jul",
      2022: 490,
      2023: 300,
      amt: 200
    },
    {
      name: "Aug",
      2022: 490,
      2023: 300,
      amt: 200
    },
    {
      name: "Sep",
      2022: 490,
      2023: 0,
      amt: 200
    },
    {
      name: "Oct",
      2022: 490,
      2023: 0,
      amt: 200
    },
    {
      name: "Nov",
      2022: 490,
      2022: 0,
      amt: 200
    },
    {
      name: "Dec",
      2022: 490,
      2023: 0,
      amt: 200
    }
];

export default function MilkYearMonthChart() {
    return (
        <LineChart 
            width={450} 
            height={300} 
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="2023" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line yAxisId="right" type="monotone" dataKey="2022" stroke="#82ca9d" />
        </LineChart>
    );
}
