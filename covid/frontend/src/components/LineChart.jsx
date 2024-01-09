import React from 'react';
import ReactEcharts from 'echarts-for-react';

const LineChart = ({ data1, data2, timeLabels, labels }) => {
  const option = {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: labels,
    },
    xAxis: {
      type: 'category',
      data: timeLabels,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: labels[0],
        type: 'line',
        data: data1,
      },
      {
        name: labels[1],
        type: 'line',
        data: data2,
      },
    ],
  };

  return <ReactEcharts option={option} style={{ height: '400px', width: '100%' }} />;
};

export default LineChart;