import React from 'react';
import ReactEcharts from 'echarts-for-react';

const DualBarChart = ({ data1, data2, labels }) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Screening Air Travelers', 'Screening Ship Travelers'],
    },
    xAxis: {
      type: 'category',
      data: labels,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: 'Screening Air Travelers',
        type: 'bar',
        barWidth: '40%',
        data: data1,
      },
      {
        name: 'Screening Ship Travelers',
        type: 'bar',
        barWidth: '40%',
        data: data2,
      },
    ],
  };

  return <ReactEcharts option={option} style={{ height: '400px', width: '100%' }} />;
};

export default DualBarChart;
