/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React, {useContext, useEffect, useState} from 'react';
import { CommandContext } from './Context/CommandContext/CommandContext';
import { TimerContext } from './Context/TimerContext/TimerContext';

function Main() {
  const { action, setCommand } = useContext(CommandContext);
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
    TimeProcessor(action);
  }, [action]);

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
const secondsToHms = (d) => {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor((d % 3600) / 60);
	var s = Math.floor((d % 3600) % 60);

	var hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
	var mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
	var sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
	return hDisplay + mDisplay + sDisplay;
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
			<button type='submit' onClick={() => handleCommandSubmit()}>
				Submit
			</button>
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
				<div>Time: {secondsToHms((elapsedTime / 1000))} </div>
				<div>
					<button
						type='button'
						onClick={() => handleStart(Date.now())}
					>
						Start
					</button>
					<button type='button' onClick={() => handlePause()}>
						Pause
					</button>
					<button type='button' onClick={() => handleResume()}>
						Resume
					</button>
					<button type='button' onClick={() => handleEnd()}>
						End
					</button>
				</div>
			</div>
		</>
  );
}

export default Main;