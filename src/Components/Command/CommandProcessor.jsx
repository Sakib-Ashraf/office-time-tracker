// @ts-nocheck
import React, { useEffect, useState } from 'react';

const CommandProcessor = ({ commandString, onCommandProcessed }) => {
	const [previousCommandString, setPreviousCommandString] = useState(null);

    useEffect(() => {
		if (commandString) {
			localStorage.setItem('currentCommand', commandString);
			if (previousCommandString !== commandString) {
				localStorage.setItem('previousCommand', previousCommandString);
				setPreviousCommandString(commandString);
			}
		}
	}, [commandString, previousCommandString]);
	useEffect(() => {
		const previousCommand = localStorage.getItem('previousCommand');
		const currentCommand = localStorage.getItem('currentCommand');

		if (currentCommand) {
			if (currentCommand.toLowerCase().includes('signing in')) {
				onCommandProcessed('Start');
			} else if (
				currentCommand.toLowerCase().includes('taking a break') ||
				currentCommand.toLowerCase().includes('taking break') ||
				currentCommand.toLowerCase().includes('break')
			) {
				if (
					previousCommand &&
					(previousCommand.toLowerCase().includes('taking a break') ||
						previousCommand
							.toLowerCase()
							.includes('taking break') ||
						previousCommand.toLowerCase().includes('break'))
				) {
					onCommandProcessed('Resume');
				} else {
					onCommandProcessed('Pause');
				}
			} else if (
				currentCommand.toLowerCase().includes('back from break') ||
				currentCommand.toLowerCase().includes('returned') ||
				currentCommand.toLowerCase().includes('back')
			) {
				onCommandProcessed('Resume');
			} else if (currentCommand.toLowerCase().includes('signing out')) {
				onCommandProcessed('End');
			}
		}
	}, [onCommandProcessed, previousCommandString]);

	return <div></div>;
};

export default CommandProcessor;
