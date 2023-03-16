// @ts-nocheck
import React, { useState, useEffect } from 'react';

const Timer = ({ halftime = 4 * 60 * 60 * 1000 }) => {
	const [time, setTime] = useState(0);
	const [timerInterval, setTimerInterval] = useState(null);
	const [lastHalfTime, setLastHalfTime] = useState(null);
	const [doubleHalfTime, setDoubleHalfTime] = useState(null);
	const [endNotificationSent, setEndNotificationSent] = useState(false);

	useEffect(() => {
		if (time === halftime && !lastHalfTime) {
			setLastHalfTime(time);
			alert('Half time reached');
		} else if (time === doubleHalfTime && !endNotificationSent) {
			setEndNotificationSent(true);
			alert('Double of half-time reached');
		} else if (time === halftime * 3 && !endNotificationSent) {
			setEndNotificationSent(true);
			alert('3x half-time reached');
		}
	}, [time, halftime, lastHalfTime, doubleHalfTime, endNotificationSent]);

	const startTimer = (startTime = Date.now()) => {
		clearInterval(timerInterval);
		setTimerInterval(
			setInterval(() => {
				setTime(Date.now() - startTime);
			}, 1000)
		);
	};

	const pauseTimer = () => {
		clearInterval(timerInterval);
	};

	const resumeTimer = () => {
		startTimer(Date.now() - time);
	};

	const endTimer = () => {
		clearInterval(timerInterval);
		setTime(0);
		setTimerInterval(null);
		setLastHalfTime(null);
		setDoubleHalfTime(null);
		setEndNotificationSent(false);
	};

	const handleStart = (startTime) => {
		startTimer(startTime);
	};

	const handlePause = () => {
		pauseTimer();
	};

	const handleResume = () => {
		resumeTimer();
	};

	const handleEnd = () => {
		endTimer();
	};

	return (
		<div>
			<div>Time: {Math.floor(time / 1000)} seconds</div>
			<div>
				<button onClick={() => handleStart(Date.now())}>Start</button>
				<button onClick={() => handlePause()}>Pause</button>
				<button onClick={() => handleResume()}>Resume</button>
				<button onClick={() => handleEnd()}>End</button>
			</div>
		</div>
	);
};

export default Timer;
