import React, { Component } from "react";
import Entity from "./Entity";
import styles from "./MediaPlayer.module.css";
import MediaPlayerIconOff from "./MediaPlayer_off.svg";
import MediaPlayerIconOn from "./MediaPlayer_on.svg";
import MediaPlayerIconPlaying from "./MediaPlayer_playing.svg";
import MediaPlayerIconPaused from "./MediaPlayer_paused.svg";
import SettingsPowerIcon from "./Settings_power.svg";
import SettingsPauseIcon from "./Settings_pause.svg";
import SettingsPlayIcon from "./Settings_play.svg";
import { Ticker, Knob } from "../widgets";

class MediaPlayerSettings extends Component {
  volumeSet = (volumeLevel) => {
    this.props.fetch('/services/media_player/volume_set', {volume_level: volumeLevel});
  };

  render() {
    return (
      <div>
        <Knob
          value={this.props.attributes.volume_level}
          onIncrease={this.volumeSet}
          onDecrease={this.volumeSet}
          step={0.1}
          accentColor="rgb(145, 227, 171)"
          label="Volume"
          min={0}
          max={1}
          />
      </div>
    )
  }
}

class MediaPlayer extends Component {
  constructor(props) {
    super(props);
  }

  togglePower = () => {
    if (this.props.state === "off") {
      this.props.fetch('/services/media_player/turn_on');
    } else {
      this.props.fetch('/services/media_player/turn_off');
    }
  };

  togglePlayPause = () => {
    this.props.fetch('/services/media_player/media_play_pause');
  };

  getIcon = () => {
    switch (this.props.state) {
      case 'off':
        return MediaPlayerIconOff;
      case 'playing':
        return MediaPlayerIconPlaying;
      case 'paused':
        return MediaPlayerIconPaused;
      default:
        return MediaPlayerIconOn;
    }
  };

  getBackgroundImage = () => {
    if (this.props.attributes.entity_picture && (this.props.state === "playing" || this.props.state === "paused")) {
      return `${process.env.REACT_APP_API_URL}${this.props.attributes.entity_picture}`;
    }
  };

  renderName = () => {
    let name = this.props.attributes.friendly_name;

    if (this.props.state === "playing" || this.props.state === "paused") {
      let data = [
        {id: name, text: name},
      ];
      let foundMediaInfo = false;
      if (this.props.attributes.media_artist) {
        data.push({id: this.props.attributes.media_artist, text: this.props.attributes.media_artist});
        foundMediaInfo = true;
      }

      if (this.props.attributes.media_title) {
        data.push({id: this.props.attributes.media_title, text: this.props.attributes.media_title});
        foundMediaInfo = true;
      }

      if (foundMediaInfo) {
        return (
          <div className={this.getBackgroundImage() ? styles.FriendlyNameBlended : styles.FriendlyName} style={{minHeight: "2rem"}}>
            <Ticker
              items={data}
              interval={5000}
              />
          </div>
        );
      }
    }

    return (
      <div className={styles.FriendlyName}>
        {name}
      </div>
    );
  };

  render() {
    console.log(this.props);
    const backgroundImage = this.getBackgroundImage();
    return (
      <Entity
        {...this.props}
        toggleUrl="/services/media_player/media_play_pause"
        toggleNextState={this.props.state === "playing" ? "paused" : "playing"}
        settingsComponent={MediaPlayerSettings}
        settingsQuickActions={[
          {icon: SettingsPowerIcon, onClick: this.togglePower, visible: true},
          {icon: SettingsPlayIcon, onClick: this.togglePlayPause, visible: this.props.state === 'paused'},
          {icon: SettingsPauseIcon, onClick: this.togglePlayPause, visible: this.props.state === 'playing'},
        ]}
        >
        <div
          style={backgroundImage
            ? {
                background: `url(${backgroundImage}) no-repeat`,
                backgroundSize: "cover",
              }
            : null
          }
          className={this.props.state !== 'off' ? styles.On : styles.MediaPlayer}
          >
          <img src={this.getIcon()} alt="media player icon" />
          {this.renderName()}
        </div>
      </Entity>
    )
  };
}

export default MediaPlayer;