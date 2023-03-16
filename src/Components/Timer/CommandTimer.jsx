// @ts-nocheck
import React, { useState, useEffect, useRef } from 'react';
import Timer from './Timer';

const CommandTimer = (props) => {
	const [timer, setTimer] = useState(null);
	const timerRef = useRef(null);

	useEffect(() => {
		if (props.command === 'start') {
			setTimer(<Timer />);
		} else if (props.command === 'pause') {
			timerRef.current && timerRef.current.pause();
		} else if (props.command === 'resume') {
			timerRef.current && timerRef.current.resume();
		} else if (props.command === 'end') {
			timerRef.current && timerRef.current.end();
			setTimer(null);
		}
	}, [props.command]);

	return <div ref={timerRef}>{timer}</div>;
};

export default CommandTimer;
