import React, { Component } from 'react';
import styles from "./Header.module.css";
import moment from "moment";

const Value = ({label, state}) => (
  <div className={styles.Value}>
    <span className={styles.ValueLabel}>{label}:</span>
    {Math.round(parseFloat(state.state))}{state.attributes.unit_of_measurement}
  </div>
);

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: moment().format("dddd"),
      date: moment().format("Do MMMM"),
      time: moment().format("hh:mm a"),
    };
  }

  componentDidMount = () => {
    setInterval(this.updateDateTime, 60000);
  };

  updateDateTime = () => {
    this.setState({
      day: moment().format("dddd"),
      date: moment().format("Do MMMM"),
      time: moment().format("hh:mm a"),
    });
  };

  render() {
    return (
      <header className={styles.Header}>
        <div className={styles.RowOne}>
          <div className={styles.Date}>
            {this.state.day}
            <span className={styles.InvertedSeparator}>|</span>
            {this.state.date}
          </div>
          {this.props.weather
            ? <div className={styles.WeatherSummary}>
                {this.props.weather.summary.state}
                <span className={styles.Separator}>|</span>
                {this.props.weather.currentTemperature.state}{this.props.weather.currentTemperature.attributes.unit_of_measurement}
              </div>
            : null}
        </div>

        <div className={styles.RowTwo}>
          <div className={styles.Time}>{this.state.time}</div>
          {this.props.weather
            ? <div className={styles.ValuesContainer}>
                <Value
                  label="low"
                  state={this.props.weather.lowTemperature}
                />
                <Value
                  label="high"
                  state={this.props.weather.highTemperature}
                />
                <Value
                  label="wind"
                  state={this.props.weather.windSpeed}
                />
                <Value
                  label="rain"
                  state={this.props.weather.precipProbability}
                />
              </div>
            : null}
        </div>

        {/*<div className={styles.Clock}>*/}
          {/**/}
          {/**/}
        {/*</div>*/}
        {/*{this.props.weather*/}
          {/*? <div className={styles.Weather}>*/}
              {/**/}
              {/**/}
            {/*</div>*/}
          {/*: null}*/}
        <div className={styles.EditLayout}>
          {this.props.layoutEditable
            ? <button onClick={this.props.onSaveLayout}>
              Save
            </button>
            : <button onClick={this.props.onEditLayout}>
              Edit
            </button>}
        </div>
      </header>
    );
  }
}

export default Header;
