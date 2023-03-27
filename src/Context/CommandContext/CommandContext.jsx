/* eslint-disable no-unused-vars */
// @ts-nocheck
import React, { createContext, useState, useEffect } from 'react';

const CommandContext = createContext({});

const CommandProvider = ({ children }) => {
	const [command, setCommand] = useState('');
	const [action, setAction] = useState('');

    const handleCommandProcessed = (action) => {
		setAction(action);
	};

	useEffect(() => {
		localStorage.setItem('currentCommand', command);
	}, [command, setCommand]);

	return (
		<CommandContext.Provider value={{ action, handleCommandProcessed, setCommand }}>
            {children}
			<CommandProcessor
				commandString={command}
				onCommandProcessed={handleCommandProcessed}
			/>
		</CommandContext.Provider>
	);
};


const CommandProcessor = ({ commandString, onCommandProcessed }) => {
	const [previousCommandString, setPreviousCommandString] = useState('');

	useEffect(() => {
			if (previousCommandString !== commandString) {
				localStorage.setItem('previousCommand', previousCommandString);
				setPreviousCommandString(commandString);
			}
	}, [commandString, previousCommandString]);

	useEffect(() => {
		const previousCommand = localStorage.getItem('previousCommand');
		const currentCommand = localStorage.getItem('currentCommand');

		switch (true) {
			case currentCommand &&
				currentCommand.toLowerCase().includes('signing in'):
				onCommandProcessed('Start');
				break;

			case (currentCommand &&
				currentCommand.toLowerCase().includes('taking a break')) ||
				(currentCommand &&
					currentCommand.toLowerCase().includes('taking break')) ||
				(currentCommand &&
					currentCommand.toLowerCase().includes('break')):
				if (
					(previousCommand &&
						previousCommand
							.toLowerCase()
							.includes('taking a break')) ||
					previousCommand.toLowerCase().includes('taking break') ||
					previousCommand.toLowerCase().includes('break')
				) {
					onCommandProcessed('Resume');
				} else {
					onCommandProcessed('Pause');
				}
				break;

			case (currentCommand &&
				currentCommand.toLowerCase().includes('back from break')) ||
				(currentCommand &&
					currentCommand.toLowerCase().includes('returned')) ||
				(currentCommand &&
					currentCommand.toLowerCase().includes('back')):
				onCommandProcessed('Resume');
				break;

			case (currentCommand &&
				currentCommand.toLowerCase().includes('signing out')) ||
				(currentCommand &&
					currentCommand.toLowerCase().includes('out')):
				onCommandProcessed('End');
				break;

			default:
				onCommandProcessed('');
				break;
		}

	}, [onCommandProcessed, previousCommandString]);

	return null;
};

export { CommandProvider, CommandContext };
