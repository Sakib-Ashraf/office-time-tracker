/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, {useContext, useEffect, useState} from 'react';
import { CommandContext } from './Context/CommandContext/CommandContext';
import { TimerContext } from './Context/TimerContext/TimerContext';

function Main() {
  const { action, command, setCommand } = useContext(CommandContext);
  const {
    TimeProcessor,
		date,
		time,
		timezone,
		period,
		handleCommand,
		halftime,
		setHalftime,
		handleStart,
		handlePause,
		handleResume,
		handleEnd,
		elapsedTime,
  } = useContext(TimerContext);

  const [commandInput, setCommandInput] = useState('');

  useEffect(() => {
    handleCommand(action);
    TimeProcessor(command);
  }, [command]);

  const handleHalfTime = (e) => {
    let time = e.target.value * 60 * 60 * 1000;
    setHalftime(time);
  };

  const handleCommandSubmit = () => {
    setCommand(commandInput);
  };
  
  const commandOnChangeHandler = (e) => {
    setCommandInput(e.target.value);
  };
  
  return (
		<>
			<h1>Office Time Tracker</h1>
			<label htmlFor='command_input'>Command Input: </label>
			<input
				type='text'
				id='command_input'
				value={commandInput}
				onChange={commandOnChangeHandler}
			/>
			<button onClick={() => handleCommandSubmit()}>Submit</button>
			<br />
			<label htmlFor='halftime'>Halftime Value (in hrs): </label>
			<input
				type='number'
				id='halftime'
				value={halftime / (60 * 60 * 1000)}
				onChange={handleHalfTime}
			/>

			<div>
				<p>Date: {date}</p>
				<p>
					Time: {time} {period}
				</p>
				<p>Timezone: {timezone}</p>
			</div>
			<div>
				<div>Time: {Math.floor(elapsedTime / 1000)} seconds</div>
				<div>
					<button onClick={() => handleStart(Date.now())}>
						Start
					</button>
					<button onClick={() => handlePause()}>Pause</button>
					<button onClick={() => handleResume()}>Resume</button>
					<button onClick={() => handleEnd()}>End</button>
				</div>
			</div>
		</>
  );
}

export default Main;