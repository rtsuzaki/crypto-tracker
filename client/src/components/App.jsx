import React from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import Calendar from './Calendar.jsx';
import '../style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBPIData: null,
      currencyType: 'USD',
      chartType: 'Line',
      data: null,
      startDate: null,
      endDate: null,
    };
    // this.getCurrentBPI = this.getCurrentBPI.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.getHistoricalBPI = this.getHistoricalBPI.bind(this);
    this.handleChartChange = this.handleChartChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  componentDidMount() {
    this.getCurrentBPI();
    this.getHistoricalBPI();
  }

  getCurrentBPI() {
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => {
        this.setState({ currentBPIData: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getHistoricalBPI() {
    let requestUrl;
    
    if (this.state.startDate === null || this.endDate === null || this.state.currencyType !== 'USD') {
      requestUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?currency=${this.state.currencyType}`;
    } else {
      requestUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${this.state.startDate}&end=${this.state.endDate}`;
    }
    axios.get(requestUrl)
      .then((response) => {
        const prices = [];
        const dates = Object.keys(response.data.bpi);
        dates.forEach((date) => prices.push(response.data.bpi[date]));
        this.setState({
          data: {
            labels: dates,
            datasets: [{
              label: 'Bitcoin Price Index',
              backgroundColor: 'rgba(242,133,94,0.5)',
              borderColor: 'rgba(242,133,94,1)',
              borderWidth: 1,
              hoverBackgroundColor: 'rgba(242,133,94,0.4)',
              hoverBorderColor: 'rgba(242,133,94,1)',
              data: prices,
            }],
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleCurrencyChange(event) {
    this.setState({ currencyType: event.target.value });
  }

  handleChartChange(event) {
    this.setState({ chartType: event.target.value });
  }

  handleStartDateChange(event) {
    this.setState({ startDate: event.target.value });
  }

  handleEndDateChange(event) {
    this.setState({ endDate: event.target.value });
  }

  render() {
    if (this.state.data) {
      return (
        <div id="mainContainer">
          <div>
            {this.state.currentBPIData
              && (
              <div id="currentBPI" style={{ fontSize: 36, padding: '30px', fontFamily: 'sans-serif' }}>
                The Current BPI is ${this.state.currentBPIData.bpi[this.state.currencyType].rate}
              </div>
              )
            }
          </div>

          <Calendar
            handleStartDateChange={this.handleStartDateChange}
            handleEndDateChange={this.handleEndDateChange}
            getHistoricalBPI={this.getHistoricalBPI}
          />

          <div id="chartSelection">
            <span style={{ margin: '10px', fontFamily: 'sans-serif' }}>
              Currency:
              <select value={this.state.currencyType} onChange={this.handleCurrencyChange}>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="USD">USD</option>
              </select>
            </span>
            <span style={{ margin: '10px', fontFamily: 'sans-serif' }}>
              Chart Type:
              <select value={this.state.chartType} onChange={this.handleChartChange}>
                <option value="Line">Line</option>
                <option value="Bar">Bar</option>
              </select>
            </span>
          </div>
          
          <div className="chart">
          {this.state.chartType==="Bar" 
            ? <Bar data={this.state.data} />
            : <Line data={this.state.data} />
          }
            <a href='https://www.coindesk.com/price/'>
              Powered by CoinDesk
            </a>
          </div>
        </div>
      );
    }
    return null;
  }
}

export default App;
