import React from 'react'
import Timer from "./Timer";
import NewPomodoroTimer from "./NewPomodoroTimer";
import pomodoros from "../pomodoroTimer";
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import audio from '../Sound/audio_hero_Cat_DIGIC08-69.mp3';

import ResetTimer from "./Reset";

const TimerBox = styled.div`
  border: "solid black 2px"  
`;

const SelectorBox = styled.div`
    border: "solid black 1px"
`;

const SettingPanel = styled(Button)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%); 
  border-radius: 3px;
  border: 0;
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);    
`;

const Container = styled.div`
`;


class Watch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date(),
            counter: "",
            pomodoroTimers: pomodoros,
            reset: false,
            timerValue: 0,
            settingPanel: false
        };
        this.setTimer = this.setTimer.bind(this);
        this.intervalID = null;
        this.handleTimerRemover = this.handleTimerRemover.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleSettingPanel = this.handleSettingPanel.bind(this);
    }

    handleSettingPanel(e) {
        e.preventDefault();
        this.setState({
            settingPanel: !this.state.settingPanel});
    }

    handleReset(reset) {
        this.setState({ reset });
        if(this.state.reset) {
            clearInterval(this.intervalID);
            this.setState({ counter: 0 });
        }
    }

    handleTimerRemover(id) {
        this.setState({ pomodoroTimers: this.state.pomodoroTimers.filter(item => id !== item.id)});
        console.log("id", id, this.state.pomodoroTimers.filter(item => id !== item.id));

    }

    setTimer(counter) {
        this.setState({ pomodoroTimers: this.state.pomodoroTimers.concat([])});
        if(this.intervalID !== null) {
            clearInterval(this.intervalID);
        }
        this.setState({counter});
        this.intervalID = setInterval(() =>  {
            let value = this.state.counter;
            value = value - 1000;
            this.setState({counter: value});
            console.log("value", value);
            if (value <= 0) {
                this.setState({counter: 0});
                clearInterval(this.intervalID);
            }
        }, 1000)
    }

    componentDidMount() {
       this.watchID = setInterval(() => {
           this.tick();
           }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.watchID);
        clearInterval(this.intervalID);
    }

    tick() {
        this.setState({ time: new Date()})
    }

    handleNewTimer = (item) => {
        this.setState({ timerValue: item });
    };

    handleSubmition = (item) => {
        this.setState({ pomodoroTimers: [...this.state.pomodoroTimers, { "timer": this.state.timerValue,
                "id": Math.random()}]});
        return item;
    };

    render() {
        const sound = () =>
            this.state.counter === 0
                ? (<audio autoPlay><source src={audio} type="audio/mp3" /></audio>)
                : undefined;
        const pomodoroData = this.state.pomodoroTimers.map( item =>
            <div key={item.id}>
            <Timer
                settingPanel={this.state.settingPanel}
                onClickTimerRemover={this.handleTimerRemover}
                timePeriod={item.timer}
                id={item.id}
                onClick={(e, counter) => {
                    this.setTimer(counter);
                }}
            />
            </div>
        );
        const settingPanel = (settingPanel) => {
            switch (settingPanel) {
                case false:
                   return <FontAwesomeIcon icon="edit" />;
                case true:
                    return <FontAwesomeIcon icon="angle-left"/>;
                default:
                    return <FontAwesomeIcon icon="edit" />;
            }
        };
        const newPomodoroTimer = () => this.state.settingPanel ? <NewPomodoroTimer
            onSubmit={this.handleSubmition}
            handleNewTimer={this.handleNewTimer}
        />: "";
       return(
           <Container>
               <TimerBox>
                   Now is: {this.state.time.toLocaleTimeString()}
               </TimerBox>
               <SettingPanel
                   onClick={(e) => {
                   this.handleSettingPanel(e);
               }}
               >
                   {settingPanel(this.state.settingPanel)}
                   </SettingPanel>
               <SelectorBox>
               {pomodoroData}
               </SelectorBox>
               <TimerBox>
                   <Typography>
                   Time left: {this.state.counter / 1000} seconds
                   </Typography>
                   <ResetTimer onClick={this.handleReset}/>
               </TimerBox>
               {newPomodoroTimer()}
               {sound()}
           </Container>
       );
    }
}

export default Watch;

