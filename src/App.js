import React, { Component } from 'react';
import Group from "./Group";
import Header from "./Header";
import Background from "./Background";
import styles from "./App.module.css";

function json(response) {
  return response.json()
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      states: null,
      layoutEditable: false,
    };
  }

  componentDidMount() {
    this.fetchStates();
    setInterval(this.updateDateTime, 60000);
  };

  fetchStates() {
    fetch(`${process.env.REACT_APP_API_URL}/api/states`, {
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json; charset=UTF-8",
        "x-ha-access": process.env.REACT_APP_API_PASSWORD,
      },
    })
      .then(json)
      .then((data) => {
        this.updateStates(data);
        console.log(data);
      })
      .catch((error) => {
        console.log('Request failed', error);
      });
  };

  updateStates(states) {
    let statesMap = {};
    for (let i in states) {
      const state = states[i];
      statesMap[state.entity_id] = state;
    }

    this.setState({states: statesMap});
  };

  refreshStates() {
    if (this.refreshStatesTimeout) {
      clearTimeout(this.refreshStatesTimeout);
    }

    this.refreshStatesTimeout = setTimeout(this.fetchStates.bind(this), 1000);
  };

  fetch = (url, entityId, body, callback) => {
    let requestBody = {entity_id: entityId};
    if (body) {
      requestBody = {
        ...requestBody,
        ...body,
      };
    }

    fetch(`${process.env.REACT_APP_API_URL}/api${url}`, {
      method: 'post',
      headers: {
        "Accept": "application/json",
        "Content-type": "application/json; charset=UTF-8",
        "x-ha-access": process.env.REACT_APP_API_PASSWORD,
      },
      body: JSON.stringify(requestBody),
    })
      .then(json)
      .then((data) => {
        if (callback) {
          callback();
        } else {
          this.refreshStates();
        }
      })
      .catch((error) => {
        console.log('Request failed', error);
      });
  };

  getGroups = () => {
    let groups = [];
    for (let state in this.state.states) {
      if (state.startsWith('group.') && !state.startsWith('group.all_') && !state.startsWith('group.default_view')) {
        groups.push(this.state.states[state]);
      }
    }

    groups.sort(function(a, b) {
      return a.attributes.order - a.attributes.order;
    });

    return groups;
  };

  getStatesInGroup = (groupId) => {
    let states = [];
    const group = this.state.states[groupId];
    for (let i in group.attributes.entity_id) {
      const stateId = group.attributes.entity_id[i];
      const state = this.state.states[stateId];
      if (state) {
        states.push(state);
      } else {
        console.log(`Could not find state for: ${stateId}`);
      }
    }

    return states;
  };

  handleEditLayout = () => {
    this.setState({
      layoutEditable: true,
    })
  };

  handleSaveLayout = () => {
    this.setState({
      layoutEditable: false,
    })
  };

  setEntityState = (entityId, state) => {
    this.setState({
      states: {
        ...this.state.states,
        [entityId]: {
          ...this.state.states[entityId],
          state: state,
        }
      }
    })
  };

  getWeather = () => {
    if (this.state.states) {
      const states = this.state.states;
      return {
        summary: states['sensor.dark_sky_summary'],
        windSpeed: states['sensor.dark_sky_wind_speed'],
        windBearing: states['sensor.dark_sky_wind_bearing'],
        precipProbability: states['sensor.dark_sky_precip_probability'],
        humidity: states['sensor.dark_sky_humidity'],
        currentTemperature: states['sensor.dark_sky_temperature'],
        lowTemperature: states['sensor.dark_sky_overnight_low_temperature'],
        highTemperature: states['sensor.dark_sky_daytime_high_temperature'],
      }
    }
  };

  render() {
    const groups = this.getGroups();
    const weather = this.getWeather();
    return (
      <React.Fragment>
        <div className={styles.App}>
          <Header
            weather={weather}
            layoutEditable={this.state.layoutEditable}
            onEditLayout={this.handleEditLayout.bind(this)}
            onSaveLayout={this.handleSaveLayout.bind(this)}
            />
          <div className={styles.GroupContainer}>

            {groups && groups.map((g) =>
              <Group
                {...g}
                states={this.getStatesInGroup(g.entity_id)}
                refreshStates={this.refreshStates.bind(this)}
                setEntityState={this.setEntityState.bind(this)}
                layoutEditable={this.state.layoutEditable}
                fetch={this.fetch.bind(this)}
              />
            )}
          </div>
        </div>
        <Background
          weatherSummary={weather ? weather.summary.state : null}
          />
      </React.Fragment>
    );
  }
}

export default App;
