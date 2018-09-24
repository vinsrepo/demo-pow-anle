import React from 'react';

export default class ZombieRun extends React.Component {
    interval;
    state = {
        positionX: 0
    }

    componentDidMount() {
        var that = this;
        this.interval = setInterval(() => {
        that.setState({ positionX: that.state.positionX + 4 })
        }, 60);
    }

    componentWillUnmount = () => {
        clearInterval(this.interval);
    }
  

    render() {
        return(
            <div style={{ margin: 'auto',position: 'relative', top: '36%' ,backgroundPosition: this.state.positionX + '% 100%',width: 183, height:284, backgroundImage : 'url("images/zombierun.png")'}}></div>
        )
    }
}