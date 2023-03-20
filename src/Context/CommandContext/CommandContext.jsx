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
		<CommandContext.Provider value={{ action, handleCommandProcessed, command, setCommand }}>
            {children}
			<CommandProcessor
				commandString={command}
				onCommandProcessed={handleCommandProcessed}
			/>
		</CommandContext.Provider>
	);
};


const CommandProcessor = ({ commandString, onCommandProcessed }) => {
	const [previousCommandString, setPreviousCommandString] = useState(null);

	useEffect(() => {
		if (commandString) {
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
			if (
				currentCommand.toLowerCase().includes('signing in') ||
				currentCommand.toLowerCase().includes('in')
			) {
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
			} else if (
				currentCommand.toLowerCase().includes('signing out') ||
				currentCommand.toLowerCase().includes('out')
			) {
				onCommandProcessed('End');
			}
		}
	}, [onCommandProcessed, previousCommandString]);

	return null;
};

export { CommandProvider, CommandContext };
