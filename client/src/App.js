import React, { Component, useState } from 'react';

import './App.css';

class App extends Component {
  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));
  }

  // fetching the GET route from the Express server which matches the GET route from server.js
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  constructor(props) {
    super(props);
    this.state = {
      result: 0,
      homeCost: "",
      loanAmount: "",
      error: false,
      resultLabel: "Mortgage"
    };
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  onSubmitHandle(e) {
    e.preventDefault();
    this.calculateAndSetResults();
  }

  onChangeHandle({ value, resultLabel }) {
    this.clearAll();
    this.setState({ selectedOption: value, resultLabel: resultLabel });
  }
  updateHomeCost(e) {
    e.persist();
    const val = e.target.value;
    this.setState({
      homeCost: val
    });
  }

  updateLoanAmount(e) {
    e.persist();
    const val = e.target.value;
    this.setState({
      loanAmount: val
    });
  }

  clearAll() {
    this.setState({
      error: false,
      loanAmount: "",
      homeCost: "",
      result: 0
    });
  }

  setError() {
    this.setState({ error: true });
  }

  setResult(result) {
    this.setState({ result });
  }

  Error() {
    return (
      <div
        className="errorWrap align-center"
        style={{
          display: (this.state.error && "flex") || "none",
          color: "red"
        }}
      >
        <em>Please insert vaild inputs!</em>
      </div>
    );
  }
  calculateAndSetResults() {
    /* eslint no-eval: 0 */
    let result = 0;
    let loanAmount;
    let interestRate = 0.02;
    if (
      this.state.loanAmount.trim() !== ""

      //&& this.state.details.termLength.trim() !== ""
    ) {

      loanAmount = eval(this.state.loanAmount);
      result =
        ((loanAmount * interestRate) / 12).toFixed(2);
      result = `${result} Kr`;
    } else {
      this.setError();
    }
    this.setResult(result);
  }
  Results() {
    return (
      <div
        className="resultBlock"
        style={{ display: (this.state.result && "flex") || "none" }}
      >
        <span className="resultIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
          >
            <g fill="none">
              <path
                fill="#6DD400"
                d="M9 0c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9C-.014 4.044 3.992.014 8.949 0H9z"
              />
              <path
                fill="#FFF"
                d="M13.986 6.52L7.594 12.912 4.014 9.358 5.472 7.926 7.594 10.023 12.528 5.088z"
              />
            </g>
          </svg>
        </span>
        <span className="resultText">
          Result: {this.state.resultLabel} = {this.state.result}
        </span>
      </div>
    );
  }
  render() {
    return (
      <div className="wrapper">
        <div className="wrapperInner">
          <h2 className="heading">Simple Home Loan Calculator</h2>
          <form onSubmit={(e) => this.onSubmitHandle(e)}>

            <div className="form__input--control">
              <div className="input-control flex_1" >
                <label>Cost of the Home</label>
                <input
                  type="number"
                  onChange={(e) => this.updateHomeCost(e)}
                  value={this.state.homeCost}
                />
              </div>
              <div className="input-control flex_1" >
                <label>Loan Amount</label>
                <input
                  type="number"
                  onChange={(e) => this.updateLoanAmount(e)}
                  value={this.state.loanAmount}
                />
              </div>
            </div>
            <div className="buttonsControlWrap flex direction-column align-center">
              <button
                type="submit"
                className="submitBtn "
                data-event_tag="CalculateBtnClick"
                data-event_action="UserClick"
              >
                Calculate
              </button>
              <button
                type="button"
                className="cancelBtn "
                data-event_tag="ClearAllClick"
                data-event_action="UserClick"
                onClick={this.clearAll}
              >
                Clear All
              </button>
            </div>
          </form>
          {this.Error()}
          {this.Results()}
        </div>
      </div>
    );
  }
}

export default App;