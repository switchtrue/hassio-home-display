import React, { Component } from "react";
import GridLayout, { Responsive, WidthProvider } from 'react-grid-layout';
import { Climate, MediaPlayer, Switch} from "./entities";
import styles from "./Group.module.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

var ResponsiveGridLayout = WidthProvider(Responsive);

const COMPONENTS = {
  'media_player': MediaPlayer,
  'climate': Climate,
  'switch': Switch,
};

class Group extends Component {
  // handleOnLayoutChange = (layout) => {
  //   this.props.onLayoutChange(this.props.entity_id, layout);
  // };

  render() {
    return (
      <div className={styles.Group}>
        <h1 className={styles.Title}>
          {this.props.attributes.friendly_name}
        </h1>
        {/*<GridLayout*/}
          {/*className="layout"*/}
          {/*cols={2}*/}
          {/*rowHeight={142}*/}
          {/*width={344}*/}
          {/*isDraggable={this.props.layoutEditable}*/}
          {/*isResizable={this.props.layoutEditable}*/}
          {/*>*/}
        <ResponsiveGridLayout
          className="layout"
          rowHeight={110}
          breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
          cols={{lg: 2, md: 2, sm: 2, xs: 2, xxs: 2}}
          isDraggable={this.props.layoutEditable}
          isResizable={this.props.layoutEditable}
          // onLayoutChange={this.handleOnLayoutChange}
          // margin={[20, 20]}
          >
          {this.props.states.map(s => {
            const componentType = s.entity_id.split('.')[0];
            const Component = COMPONENTS[componentType];
            return (
              <div key={s.entity_id}>
                <Component
                  {...s}
                  refreshStates={this.props.refreshStates}
                  setEntityState={this.props.setEntityState}
                  layoutEditable={this.props.layoutEditable}
                  fetch={(url, body, callback) => this.props.fetch(url, s.entity_id, body, callback)}
                  />
              </div>
            );
          })}
        </ResponsiveGridLayout>
      </div>
    )
  };
}

export default Group;