/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import { CommandContext } from '../../Context/CommandContext/CommandContext';
import { TimerContext } from '../../Context/TimerContext/TimerContext';

function CommandInput () {

    const { action, command, setCommand } = useContext(CommandContext);
    const {
        halftime,
		TimeProcessor,
		handleCommand,
		setHalftime,
		FormatElapsedTime,
    } = useContext( TimerContext );
    
    const [commandInput, setCommandInput] = useState('');

    const commandOnChangeHandler = (e) => {
        setCommandInput(e.target.value);
    };

    const handleCommandSubmit = () => {
        setCommand(commandInput);
    };

    useEffect(() => {
        const { date, time, timezone, period } = TimeProcessor(command);
        let startTime = `${date} ${time} ${period} ${timezone}`;
        FormatElapsedTime(startTime);
        handleCommand(action);
    }, [action, setCommand]);

    const handleHalfTime = (e) => {
        let time = e.target.value * 60 * 60 * 1000;
        setHalftime(time);
    };

  return (
		<>
			<label htmlFor='halftime'>Halftime Value (in hrs): </label>
			<input
				type='number'
				id='halftime'
				value={halftime / (60 * 60 * 1000)}
				onChange={handleHalfTime}
			/>
			<input
				type='text'
				id='command_input'
				value={commandInput}
				onChange={commandOnChangeHandler}
			/>
			<button type='submit' onClick={() => handleCommandSubmit()}>
				Submit
			</button>
		</>
  );
}

export default CommandInput;