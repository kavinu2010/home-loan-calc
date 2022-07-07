import React, { Component } from 'react';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      result: 0,
      homeCost: "",
      cashbet: "",
      loanRatio: "",
      loanAmount: "",
      interestRate: "",
      error: false,
      resultLabel: "Monthly Cost"
    };
    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.clearAll = this.clearAll.bind(this);
  }

  componentDidMount() {
    this.callBackendAPI()
      .then(res => {
        this.state.interestRate = res + 2;
      })
      .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/interestrate');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  onSubmitHandle(e) {
    e.preventDefault();
    this.calculateAndSetResults();
  }

  updateHomeCost(e) {
    e.persist();
    const val = e.target.value;
    const cashBet = (e.target.value * 0.15).toFixed(0);
    this.setState({
      homeCost: val,
      cashbet: cashBet
    });
  }

  updateLoanAmount(e) {
    e.persist();
    const val = e.target.value;
    this.setState({
      cashbet: val
    });
  }

  clearAll() {
    this.setState({
      error: false,
      cashbet: "",
      homeCost: "",
      loanRatio: "",
      loanAmount: "",
      interestRate: "",
      result: 0
    });
  }

  setError() {
    this.setState({ error: true });
  }

  setResult(result, loanAmount, loanRatio) {
    this.setState({ result });
    this.state.loanAmount = `${loanAmount} Kr`;
    this.state.loanRatio = `${loanRatio.toFixed(0)} %`;
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
    let loanRatio;

    if (
      this.state.cashbet.trim() !== "" &&
      this.state.homeCost.trim() !== ""
    ) {
      loanAmount = (eval(this.state.homeCost) - eval(this.state.cashbet));
      loanRatio = (eval(this.state.cashbet) / eval(this.state.homeCost)) * 100;
      result =
        ((loanAmount * (this.state.interestRate) / 12) / 100).toFixed(0);
      result = `${result} Kr`;
    } else {
      this.setError();
    }
    this.setResult(result, loanAmount, loanRatio);
  }

  Results() {
    return (
      <div
        className="resultBlock"
        style={{ display: (this.state.result && "flex") || "none" }}
      >
        <div class="resultText">
          <div >
            Loan Ratio:
          </div>
          <div >
            <strong >{this.state.loanRatio}</strong>
          </div>
          <div class="resultText">
            Loan Amount:
          </div>
          <div class="resultText">
            <strong >{this.state.loanAmount}</strong>
          </div>
        </div>

        <span className="resultText cost">
          <div class="resultText">
            With Interest rate of: {this.state.interestRate}
          </div>

          {this.state.resultLabel} = {this.state.result}
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
                <label>Cash bet</label>
                <input
                  type="number"
                  onChange={(e) => this.updateLoanAmount(e)}
                  value={this.state.cashbet}
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