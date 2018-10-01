import React, { Component } from 'react';
import {TransitionMotion, spring} from 'react-motion';

function TickerItem({item}) {
  return (
    <TransitionMotion
      willEnter={() => ({
        opacity: 0,
        y: 15,
      })}
      willLeave={() => ({
        opacity: spring(0),
        y: spring(-15),
      })}
      styles={[{
        key: item.id,
        data: item,
        style: {
          opacity: spring(1),
          y: spring(0),
        },
      }]}>
      {(configs) =>
        <div className="container" style={{width: "100%"}}>
          {configs.map((config) =>
            <div className="item"
                 key={config.key}
                 style={{
                   opacity: config.style.opacity,
                   transform: `translateY(${config.style.y}px)`,
                   position: "absolute",
                   maxHeight: "2rem",
                   width: "100%",
                   overflow: "hidden",
                   textOverflow: "ellipsis",
                 }}>
              {config.data.text}
            </div>
          )}
        </div>
      }
    </TransitionMotion>
  );

}

class Ticker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: this.props.items,
      interval: this.props.interval,
      idx: 0,
    }
  }

  componentDidMount = () => {
    setInterval(this.tick, this.state.interval);
  };

  static getDerivedStateFromProps = (props, state) => {
    if (props.items.length !== state.items.length) {
      return {
        items: props.items,
        interval: props.interval,
        idx: 0,
      }
    }
    return null;
  };

  tick = () => {
    this.setState({
      idx: (this.state.idx + 1) % this.state.items.length,
    });
  };

  render() {
    return (
      this.state.items
        ? <TickerItem
            item={this.state.items[this.state.idx]}
            />
        : null
    )
  }
}

export default Ticker;