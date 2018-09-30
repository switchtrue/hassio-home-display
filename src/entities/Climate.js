import React, { Component } from "react";
import Entity from "./Entity";
import styles from "./Climate.module.css";
import ClimateIconOn from "./Climate_on.svg";
import ClimateIconOff from "./Climate_off.svg";
import { Knob, Select } from "../widgets";
import SettingsPowerIcon from "./Settings_power.svg";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

class ClimateSettings extends Component {
  constructor(props) {
    super(props);
  }

  temperatureSet = (temperature) => {
    this.props.fetch('/services/climate/temperature_set', {temperature: temperature});
  };

  handleFanChange = (value) => {
    this.props.fetch('/services/climate/set_fan_mode', {fan_mode: value.value});
  };

  handleOperationChange = (value) => {
    this.props.fetch('/services/climate/set_operation_mode', {operation_mode: value.value});
  };

  handleSwingChange = (value) => {
    this.props.fetch('/services/climate/set_swing_mode', {swing_mode: value.value});
  };

  render() {
    return (
      <div className={styles.ClimateSettings}>
        <Knob
          value={this.props.attributes.current_temperature}
          onIncrease={this.temperatureSet}
          onDecrease={this.temperatureSet}
          step={1}
          accentColor="rgb(113, 196, 250)"
          label="Temperature"
          unit="°C"
          min={this.props.attributes.min_temp}
          max={this.props.attributes.max_temp}
        />
        <div className={styles.ClimateOptions}>
          {this.props.attributes.fan_list
            ? <Select
                label="Fan Mode"
                options={this.props.attributes.fan_list}
                onChange={this.handleFanChange}
                value={this.props.attributes.fan_mode}
                placeholder="Fan mode"
                />
            : null}
          {this.props.attributes.operation_list
            ? <Select
                label="Operation Mode"
                options={this.props.attributes.operation_list}
                onChange={this.handleOperationChange}
                value={this.props.attributes.operation_mode}
                placeholder="Operation mode"
                />
            : null}
          {this.props.attributes.swing_list
            ? <Select
                label="Swing Mode"
                options={this.props.attributes.swing_list}
                onChange={this.handleSwingChange}
                value={this.props.attributes.swing_mode}
                placeholder="Swing mode"
                />
            : null}
        </div>
      </div>
    )
  }
}

class Climate extends Component {
  togglePower = () => {
    if (this.props.state === "off") {
      this.props.fetch('/services/climate/turn_on');
    } else {
      this.props.fetch('/services/climate/turn_off');
    }
  };

  render() {
    return (
      <Entity
        {...this.props}
        toggleUrl={this.props.state === "off" ? "/services/climate/turn_on" : "/services/climate/turn_off"}
        toggleNextState={this.props.state === "off" ? this.props.attributes.fan_mode : "off"}
        settingsComponent={ClimateSettings}
        settingsQuickActions={[
          {icon: SettingsPowerIcon, onClick: this.togglePower, visible: true},
        ]}
        >
        <div
          className={this.props.state !== 'off' ? styles.On : styles.Climate}
          >
          <img src={this.props.state === 'off' ? ClimateIconOff : ClimateIconOn} alt="climate icon" />
          <div className={styles.FriendlyName}>{this.props.attributes.friendly_name}</div>
          <div className={styles.Temperature}>{this.props.attributes.current_temperature}°C</div>
        </div>
      </Entity>
    )
  };
}

export default Climate;