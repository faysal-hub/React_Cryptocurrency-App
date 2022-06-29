import React from 'react';
import { Col, Row, Typography } from 'antd';
import moment from 'moment';
import { Chart } from 'react-chartjs-2';
import 'chart.js/auto';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      moment(coinHistory.data.history[i].timestamp * 1000).format(
        "Do MMMM, 'YY (HH:mm)"
      )
    );
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {}

  coinPrice.reverse();
  coinTimestamp.reverse();

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        labels: {
          color: 'rgb(255, 99, 132)',
        },
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        ticks: {
          display: false,
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change: {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Chart type="line" options={options} data={data} />
    </>
  );
};

export default LineChart;
