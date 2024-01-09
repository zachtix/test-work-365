import React from 'react';
import ReactEcharts from 'echarts-for-react';

const PieChart = ({ data, labels }) => {
  const option = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
    },
    legend: {
      orient: 'vertical',
      left: 10,
      data: labels,
    },
    series: [
      {
        name: 'Pie Chart',
        type: 'pie',
        radius: '40%',
        avoidLabelOverlap: false,
        emphasis: {
          label: {
            show: true,
            fontSize: '30',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: true,
        },
        data,
      },
    ],
  };

  return <ReactEcharts option={option} style={{ height: '400px', width: '100%' }} />;
};

export default PieChart;
