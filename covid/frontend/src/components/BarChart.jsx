import React from 'react';
import ReactEcharts from 'echarts-for-react';

const BarChart = ({ data, labels }) => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['จำนวนการคัดกรองการเข้าประเทศแต่ละช่องทาง Chart'],
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
        name: 'จำนวนการคัดกรองการเข้าประเทศแต่ละช่องทาง Chart',
        type: 'bar',
        barWidth: '10%',
        data,
      },
    ],
  };

  return <ReactEcharts option={option} style={{ height: '400px', width: '100%' }} />;
};

export default BarChart;
