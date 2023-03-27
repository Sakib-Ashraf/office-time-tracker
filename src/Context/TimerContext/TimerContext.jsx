/* eslint-disable no-useless-escape */
// @ts-nocheck
import React, { useState, useEffect } from 'react';


const TimerContext = React.createContext({});

const TimerProvider = ({ children }) => {
	const [timerInterval, setTimerInterval] = useState(null);
	const [lastHalfTime, setLastHalfTime] = useState(null);
	const [doubleHalfTime, setDoubleHalfTime] = useState(null);
	const [endNotificationSent, setEndNotificationSent] = useState(false);
	const [halftime, setHalftime] = useState(4 * 60 * 60 * 1000);
	const [elapsedTime, setElapsedTime] = useState(0);
    
	const [time, setTime] = useState(0);
	const [timezone, setTimezone] = useState('');
    const [date, setDate] = useState('');
    const [period, setPeriod] = useState('');

    const TimeProcessor = (inputString) => {
		const timeRegex = /(\d{1,2}):(\d{2}) (AM|PM)/i; // regular expression to match time in the format hh:mm AM/PM

		const dateRegex =
			/\b\d{1,2}[\/-]\d{1,2}([\/-]\d{2}(\d{2})?)?|(\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{1,2},?\s\d{4}?)\b/; // regular expression to match date in the format DD/MM/YYYY or MMM DD, YYYY or DD-MM-YYYY or DD/MM 

		const timezoneRegex = /\((\w+[\s\w+]*)\)/i; // regular expression to match timezone in the format (timezone)

		let timezone = '';
		let date = '';
        let time = '';
        let period = '';

		// match timezone
		const timezoneMatch = inputString.match(timezoneRegex);
		if (timezoneMatch) {
			timezone = timezoneMatch[1].toLowerCase().trim();
			timezone = timezone.replace(/^\w/, (c) => c.toUpperCase());
		}

		// match date
		const dateMatch = inputString.match(dateRegex);
		if (dateMatch) {
			const dateString = dateMatch[0].replace(',', '');
			const dateComponents = dateString.split(/[\/\- ]/); // split on '/', '-' or ' ' characters
			let day = dateComponents[0];
			let month = dateComponents[1];
			let year = dateComponents[2];

			// if year is missing, assume current year
			if (year === undefined) {
				const now = new Date();
				year = now.getFullYear().toString();
			}

			// if day is missing, assume 1st of the month
			if (day === undefined) {
				day = '01';
			}

			// convert month name to number (if applicable)
			const monthNames = {
				Jan: '01',
				Feb: '02',
				Mar: '03',
				Apr: '04',
				May: '05',
				Jun: '06',
				Jul: '07',
				Aug: '08',
				Sep: '09',
				Oct: '10',
				Nov: '11',
				Dec: '12',
			};
			if (monthNames[month] !== undefined) {
				month = monthNames[month];
			}

			// create Date object from components
			const dateObject = new Date(`${year}-${month}-${day}`);
			date = dateObject.toDateString();
		}

		// match time
		const timeMatch = inputString.match(timeRegex);
		if (timeMatch) {
			let hours = parseInt(timeMatch[1]);
			const minutes = timeMatch[2];
			period = timeMatch[3].toUpperCase();
			time = `${hours}:${minutes}`;
		}

		setTime(time);
		setDate(date);
		setTimezone(timezone);
		setPeriod(period);
        return { date, time, timezone, period };
	};

    const handleCommand = (command, startTime) => {
		switch (command) {
			case 'Start':
				handleStart(startTime);
				break;
			case 'Pause':
				handlePause();
				break;
			case 'Resume':
				handleResume();
				break;
			case 'End':
				handleEnd();
				break;
			default:
				// handle default case here
				break;
		}
		return command;
	};


	const startTimer = (startTime = Date.now()) => {
		clearInterval(timerInterval);
		setTimerInterval(
			setInterval(() => {
				setElapsedTime(Date.now() - startTime);
			}, 1000)
		);
	};

	const pauseTimer = () => {
		clearInterval(timerInterval);
	};

	const resumeTimer = () => {
		startTimer(Date.now() - elapsedTime);
	};

	const endTimer = () => {
		clearInterval(timerInterval);
		setElapsedTime(0);
		setTimerInterval(null);
		setLastHalfTime(null);
		setDoubleHalfTime(null);
		setEndNotificationSent(false);
	};

	const handleStart = (startTime) => {
        console.log('start', startTime);
		startTimer(startTime);
	};

	const handlePause = () => {
        console.log('pause');
		pauseTimer();
	};

	const handleResume = () => {
        console.log('resume');
		resumeTimer();
	};

	const handleEnd = () => {
        console.log('end');
		endTimer();
	};

	useEffect(() => {
		if (elapsedTime === halftime && !lastHalfTime) {
			setLastHalfTime(elapsedTime);
			alert('Half time reached');
		} else if (elapsedTime === doubleHalfTime && !endNotificationSent) {
			setEndNotificationSent(true);
			alert('Double of half-time reached');
		} else if (elapsedTime === halftime * 3 && !endNotificationSent) {
			setEndNotificationSent(true);
			alert('3x half-time reached');
		}
	}, [elapsedTime, halftime, lastHalfTime, doubleHalfTime, endNotificationSent]);

	const FormatElapsedTime = (StartTime) => {
		// Set a specific date and time (in this case, March 10, 2022 at 12:00am)
		const specificTime = new Date('Thu Mar 10 2022 00:00:00 GMT-0800');

		// Get the current time
		const now = new Date();

		// Get the elapsed time in milliseconds
		const elapsed = now.getTime() - specificTime.getTime();

		// Convert milliseconds to seconds, minutes, hours, days, and weeks
		const seconds = Math.floor(elapsed / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const weeks = Math.floor(days / 7);
		const months = Math.floor(weeks / 4.34812);
		const years = Math.floor(months / 12);

		// Calculate the remaining weeks, days, hours, minutes, and seconds
		const remainingMonths = months % 12;
		const remainingWeeks = weeks % 4;
		const remainingDays = days % 7;
		const remainingHours = hours % 24;
		const remainingMinutes = minutes % 60;
		const remainingSeconds = seconds % 60;

		// Build the elapsed time string
		let elapsedTimeString = '';
		if (years > 0) {
			elapsedTimeString += `${years} year${years > 1 ? 's' : ''} `;
		}
		if (remainingMonths > 0) {
			elapsedTimeString += `${remainingMonths} month${
				remainingMonths > 1 ? 's' : ''
			} `;
		}
		if (remainingWeeks > 0) {
			elapsedTimeString += `${remainingWeeks} week${
				remainingWeeks > 1 ? 's' : ''
			} `;
		}
		if (remainingDays > 0) {
			elapsedTimeString += `${remainingDays} day${
				remainingDays > 1 ? 's' : ''
			} `;
		}
		if (remainingHours > 0) {
			elapsedTimeString += `${remainingHours} hour${
				remainingHours > 1 ? 's' : ''
			} `;
		}
		if (remainingMinutes > 0) {
			elapsedTimeString += `${remainingMinutes} minute${
				remainingMinutes > 1 ? 's' : ''
			} `;
		}
		if (remainingSeconds > 0) {
			elapsedTimeString += `${remainingSeconds} second${
				remainingSeconds > 1 ? 's' : ''
			} `;
		}

		// Output the elapsed time string
		console.log(`Elapsed time: ${elapsedTimeString}`);
	};


	return (
		<TimerContext.Provider
            value={{
                elapsedTime,
                lastHalfTime,
				setLastHalfTime,
				doubleHalfTime,
				setDoubleHalfTime,
				endNotificationSent,
				setEndNotificationSent,
				FormatElapsedTime,
				halftime,
				setHalftime,
				time,
				timezone,
                date,
                period,
				handleCommand,
				handleStart,
				pauseTimer,
				resumeTimer,
				endTimer,
                TimeProcessor
			}}
		>
			{children}
		</TimerContext.Provider>
	);
};

export { TimerContext, TimerProvider };
