/* eslint-disable no-useless-escape */
import React from 'react';

const TimeProcessor = ({ inputString }) => {
	const timeRegex = /(\d{1,2}):(\d{2}) (AM|PM)/i; // regular expression to match time in the format hh:mm AM/PM

	const dateRegex =
		/\b\d{1,2}[\/-]\d{1,2}([\/-]\d{2}(\d{2})?)?|(\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s\d{1,2},?\s\d{4}?)\b/; // regular expression to match date in the format 26/03/2023 or MMM DD, YYYY or 26-03-2023 or 26/03 or Mar 26, 2023

	const timezoneRegex = /\((\w+[\s\w+]*)\)/i; // regular expression to match timezone in the format (timezone)

	let timezone = '';
	let date = '';
	let time = '';

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
		const period = timeMatch[3].toUpperCase();
		time = `${hours}:${minutes} ${period}`;
	}

	return (
		<div>
			<p>Date: {date}</p>
			<p>Time: {time}</p>
			<p>Timezone: {timezone}</p>
		</div>
	);
};

export default TimeProcessor;
