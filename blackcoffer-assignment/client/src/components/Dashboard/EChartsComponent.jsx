import React, { useState, useEffect } from 'react';
import * as echarts from 'echarts';

const EChartsComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8085/api/data');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Process data and render chart when data changes
    if (data.length > 0) {
      renderChart();
    }
  }, [data]);

  const renderChart = () => {
    const chartDom = document.getElementById('main');
    const myChart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'E Chart'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: data.map(item => item.topic)
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.country)
      },
      yAxis: {
        type: 'value'
      },
      series: data.map(item => ({
        name: item.topic,
        type: 'bar',
        data: [item.intensity]
      }))
    };

    myChart.setOption(option);
  };

  return (
    <div id="main" style={{ width: '100%', height: '400px' }}></div>
  );
};

export default EChartsComponent;
