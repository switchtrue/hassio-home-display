import React, { Component } from "react";
import styles from "./Entity.module.css";
import Modal from 'react-modal';
import SettingsPowerIcon from "./Settings_power.svg";
import SettingsPauseIcon from "./Settings_pause.svg";
import SettingsPlayIcon from "./Settings_play.svg";

function json(response) {
  return response.json()
}

class Entity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showSettings: false,
    };
  }

  handleMouseDown = () => {
    if (this.props.layoutEditable) {
      return;
    }
    this.pressTimeout = setTimeout(this.doLongPress, 1000);
  };

  handleMouseUp = () => {
    if (this.props.layoutEditable) {
      return;
    }
    if (this.pressTimeout) {
      clearTimeout(this.pressTimeout);
    }

    if (!this.state.showSettings) {
      this.doToggle();
    }
  };

  doLongPress = () => {
    this.setState({
      showSettings: true,
    });
  };

  doToggle = () => {
    let { toggleUrl, toggleBody,  toggleNextState } = this.props;

    this.props.fetch(toggleUrl, toggleBody);

    if (toggleNextState) {
      this.props.setEntityState(this.props.entity_id, toggleNextState);
    }
  };

  closeSettings = () => {
    this.setState({
      showSettings: false,
    });
  };

  render() {

    // const childrenWithProps = React.Children.map(this.props.children, (child) => {
    //   return React.cloneElement(child, {fetch: this.props.fetch, ...this.props});
    // });

    return (
      <React.Fragment>
        <div
          className={styles.EntityWrapper}
          onMouseDown={!('ontouchstart' in document.documentElement) ? this.handleMouseDown : null}
          onTouchStart={('ontouchstart' in document.documentElement) ? this.handleMouseDown : null}
          onMouseUp={!('ontouchstart' in document.documentElement) ? this.handleMouseUp : null}
          onTouchEnd={('ontouchstart' in document.documentElement) ? this.handleMouseUp : null}
          >
          {this.props.children}
        </div>
        {this.props.settingsComponent || this.props.settingsQuickActions
          ? <Modal
              isOpen={this.state.showSettings}
              contentLabel="Example Modal"
              shouldCloseOnOverlayClick
              onRequestClose={this.closeSettings}
              >
              <h2 className={styles.SettingsTitle}>
                {this.props.attributes ? this.props.attributes.friendly_name : null}
              </h2>
              <div className={styles.SettingsState}>
                {this.props.state}
              </div>

              <div className={styles.SettingsContent}>
                {this.props.settingsComponent
                  ? <this.props.settingsComponent {...this.props} fetch={this.props.fetch} />
                  : null}

                <div className={styles.QuickActions}>
                  {this.props.settingsQuickActions
                    ? this.props.settingsQuickActions.map((s) => {
                        if (s.visible) {
                          return (
                            <button
                              className={styles.QuickAction}
                              onClick={s.onClick}
                              >
                              <img src={s.icon} alt="quick action icon" />
                            </button>
                          );
                        }
                      })
                    : null}
                </div>
              </div>

            </Modal>
          : null}
      </React.Fragment>
    )
  }
}

export default Entity;