import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';


import Timer from "./Timer";


class NewPomodoroTimer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { timer: "", description: "", timers: [] };
    }

    handleChangeTimer = (e) => this.setState({ timer: e.target.value });

    handleChangeDescription = (e) => this.setState({ description: e.target.value });

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ timers: this.state.timers.concat(
            <Timer
                timePeriod={this.state.timer}
                description={this.state.description}
                onClick={ (e) => this.props.onClick(e, this.state.timer)}
            />)});
    };

    render() {
        return(
            <div>
            <form onSubmit={(e) => this.props.onSubmit(this.handleSubmit(e))}>
                <FormLabel>
                    NEW TIMER
                <Input type="text" value={this.state.timer} onChange={(e) => {
                    this.props.handleNewTimer(e.target.value);
                    this.handleChangeTimer(e);
                }
                } />
                    </FormLabel>
                <FormLabel>
                    NEW TIMER DESCRIPTION
                <Input type="text" value={this.state.description} onChange={ (e) => {
                    this.props.handleNewDescription(e.target.value);
                    this.handleChangeDescription(e);
                }} />
                </FormLabel>
                <Input type="submit" value="Submit" />
            </form>
            </div>
        );
    }
};

export default NewPomodoroTimer;