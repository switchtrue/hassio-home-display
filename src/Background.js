import React from "react";
import styles from "./Background.module.css";
import Clear from "./images/clear.jpg";
import Storm from "./images/storm.jpg";
import Rain from "./images/rain.jpg";
import Cloudy from "./images/cloudy.jpg";
import PartlyCloudy from "./images/partly_cloudy.jpg";
import Snow from "./images/snow.jpg";
import HeaderBackground from "./images/Header_Background.png";

function Background({weatherSummary}) {

  let backgroundImage = Clear;
  let backgroundClass = styles.Clear;
  if (weatherSummary) {
    const weather = weatherSummary.toLowerCase();
    if (weather.indexOf('snow') >= 0) {
      backgroundImage = Snow;
      backgroundClass = styles.Snow;
    } else if (weather.indexOf('storm') >= 0) {
      backgroundImage = Storm;
      backgroundClass = styles.Storm;
    } else if (weather.indexOf('rain') >= 0) {
      backgroundImage = Rain;
      backgroundClass = styles.Rain;
    } else if (weather.indexOf('partly cloudy') >= 0) {
      backgroundImage = PartlyCloudy;
      backgroundClass = styles.PartlyCloudy;
    } else if (weather.indexOf('cloudy') >= 0) {
      backgroundImage = Cloudy;
      backgroundClass = styles.Cloudy;
    }
  }

  return (
    <React.Fragment>
      <div
        style={{
          background: `url(${backgroundImage}) no-repeat center center fixed`,
        }}
        className={backgroundClass}
        />
      <div
        style={{
          background: `url(${HeaderBackground}) no-repeat`,
        }}
        className={styles.HeaderImage}
        />
    </React.Fragment>
  )
};

export default Background;