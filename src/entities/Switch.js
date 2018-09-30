import React, { Component } from "react";
import Entity from "./Entity";
import styles from "./Switch.module.css";
import SwitchIconOn from "./Switch_on.svg";
import SwitchIconOff from "./Switch_off.svg";
import SettingsPowerIcon from "./Settings_power.svg";

class Switch extends Component {
  togglePower = () => {
    this.props.fetch('/services/switch/toggle');
  };

  render() {
    return (
      <Entity
        {...this.props}
        toggleUrl="/services/switch/toggle"
        toggleNextState={this.props.state === "off" ? "on" : "off"}
        settingsQuickActions={[
          {icon: SettingsPowerIcon, onClick: this.togglePower, visible: true},
        ]}
        >
        <div
          className={this.props.state === 'on' ? styles.On : styles.Switch}
          >
          <img src={this.props.state === 'on' ? SwitchIconOn : SwitchIconOff} alt="switch icon" />
          <div className={styles.FriendlyName}>{this.props.attributes.friendly_name}</div>
        </div>
      </Entity>
    )
  };
}

export default Switch;