import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const MyChartComponent = ({ data }) => {
  useEffect(() => {
    // Initialize echarts instance
    const myChart = echarts.init(document.getElementById('main'));

    // Extracting intensity and start_year from data
    const intensityData = data.map(item => item.intensity);
    const years = data.map(item => item.start_year);

    // Generating series data dynamically
    const seriesData = data.map(item => ({
      name: item.topic,
      type: 'line',
      stack: 'Total',
      data: intensityData
    }));

    // Specify options and set them using setOption
    const options = {
      title: {
        text: 'Intensity Over Time'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: data.map(item => item.topic) // Use topics as legend data
      },
      grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: years // Use years as xAxis data
      },
      yAxis: {
        type: 'value'
      },
      series: seriesData // Use dynamically generated series data
    };

    myChart.setOption(options);

    // Clean up on unmount
    return () => {
      myChart.dispose();
    };
  }, [data]); // Run useEffect whenever data prop changes

  return <div id="main" style={{ width: '100%', height: '400px' }} />;
};

export default MyChartComponent;
