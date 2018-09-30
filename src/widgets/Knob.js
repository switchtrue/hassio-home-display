import React, { Component } from "react";
import KnobUp from "./Knob_up.svg";
import KnobDown from "./Knob_down.svg";
import styles from "./Knob.module.css";

const TICKS = 72;

class Knob extends Component {
  render() {
    const tickVal = (this.props.max - this.props.min) / TICKS;

    return (
      <div className={styles.Knob}>
        <div className={styles.ButtonContainer}>
          <button
            className={styles.Button}
            onClick={() => this.props.onIncrease(this.props.value + this.props.step)}
            >
            <img src={KnobUp} alt="increase" />
          </button>
          <div
            className={styles.CurrentValue}
            style={{
              color: this.props.accentColor,
            }}>
            {this.props.value
              ? `${(this.props.value < 1) ? this.props.value.toFixed(1) : Math.round(this.props.value)}${this.props.unit ? this.props.unit : ""}`
              : '-'}
          </div>
          <div className={styles.Label}>
            {this.props.label}
          </div>
          <button
            className={styles.Button}
            onClick={() => this.props.onDecrease(this.props.value - this.props.step)}
            >
            <img src={KnobDown} alt="decrease" />
          </button>
        </div>
        <div style={{position: "absolute", pointerEvents: "none"}}>
          <svg width="220px" height="220px" viewBox="0 0 160 160" >
            <defs>
              <g id="lines" >
                <line y1="-68" y2="-79" />
              </g>
            </defs>
            <g transform="translate(80 80)">
              {[...Array(TICKS).keys()].map((idx) =>
                <use
                  xlinkHref="#lines"
                  transform={`rotate(${idx * (360 / TICKS)})`}
                  style={{
                    stroke: (idx * tickVal) <= this.props.value ? this.props.accentColor : "rgb(195, 195, 195)",
                  }}
                  />
              )}
            </g>
          </svg>
        </div>
      </div>
    )
  }
}

export default Knob;