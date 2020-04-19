import React, { Component } from "react";
import axios from "axios";
import "./AddStocks.css";
import Modal from "../Modal/Modal.js";
class AddStocks extends Component {
  state = {
    stockList: {},
    isModalVisible: false,
  };

  addStockHandler = (stock) => {
    let selectedStock = { ...stock };
    this.setState({
      isModalVisible: true,
      selectedStock,
    });
  };

  componentDidMount() {
    axios
      .get(
        `https://financial-portfolio-trac-73f3e.firebaseio.com/addStocks/.json`
      )
      .then((res) => {
        this.setState({ stockList: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidUpdate() {
    axios
      .get(
        `https://financial-portfolio-trac-73f3e.firebaseio.com/addStocks/.json`
      )
      .then((res) => {
        this.setState({ stockList: res.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createStockLIs = () => {
    let stockLIs = [];
    for (let stockKey in this.state.stockList) {
      const stock = this.state.stockList[stockKey];
      if (stock.isUser) {
        continue;
      }
      stockLIs.push(
        <li key={stock.symbol}>
          <button
            className="StockButton"
            id={stock.symbol}
            onClick={this.addStockHandler.bind(this, stock)}
          >
            {stock.symbol}
          </button>
          &nbsp;
          <span>{stock.name}</span>
          <br />
          <br />
        </li>
      );
    }
    return stockLIs;
  };
  render() {
    return (
      <div className="AddStocksTitle">
        <h2>Add stocks to my Stocks</h2>
        <ul>{this.createStockLIs()}</ul>
        <Modal
          show={this.state.isModalVisible}
          selectedStock={this.state.selectedStock}
        />
      </div>
    );
  }
}
export default AddStocks;