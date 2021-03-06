import React from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import format from 'date-fns/format';


const TimerSelector = styled(Button)`
    background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%); 
    border-radius: 3px;
    border: 0;
    height: 48px;
    padding: 10%;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
`;

const Container = styled.div`
    position: relative;
    margin: 10%;
`;

const Icon = styled(FontAwesomeIcon)`
    position: absolute;
    right: -0.4rem;
    top: -0.4rem;
`;

const TimerOption = ({ id, timePeriod, onClick, onClickTimerRemover, editMode}) => {

    const remove = () => editMode ? <Icon onClick={() => onClickTimerRemover(id)} icon="times-circle"/> : "";
    const time = format(timePeriod, ['mm:ss']);
    return (
        <Container>
            <TimerSelector onClick={(e) => editMode ? "" : onClick(e, timePeriod)}>
                {time}
            </TimerSelector>
            {remove()}
        </Container>
    );
};

export default TimerOption
