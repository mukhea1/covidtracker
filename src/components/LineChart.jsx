import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";
import { fetchHistoricalData } from '../api'
import '../styles/LineChart.scss'

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

const casesTypeColors = {
    cases: {
        backgroundColor: "#CC1034",
        borderColor: "#AD1406"
    },
    recovered: {
        backgroundColor: "#7dd71d",
        borderColor: "#7AFA64"
    },
    deaths: {
        backgroundColor: "#fb4443",
        borderColor: "#FA5528"
    },
  };

const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

function LineChart({ casesType, ...props }) {
    const [data, setData] = useState({});

    const getHistoricalInfo = async (caseType) => {
        const response = await fetchHistoricalData();
        let chartData = buildChartData(response, caseType);
        // console.log(`getting covid info ${countryCode}`)
        setData(chartData);
    }

    useEffect(() => {
        getHistoricalInfo(casesType);
    }, [casesType]);

    return (
        <div className="lineChart">
            {data?.length > 0 && (
                <Line
                    data={{
                        datasets: [
                            {
                                backgroundColor: casesTypeColors[casesType].backgroundColor,
                                borderColor: casesTypeColors[casesType].borderColor,
                                data: data,
                            },
                        ],
                    }}
                    options={options}
                />
            )}
        </div>
    );
}

export default LineChart;