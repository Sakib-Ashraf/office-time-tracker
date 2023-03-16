import React, { useState } from 'react';
import CommandProcessor from './CommandProcessor';

const CommandInput = () => {
	const [command, setCommand] = useState('');

	const handleCommandProcessed = (action) => {
		console.log(action);
	};

	return (
		<div>
			<input
				value={command}
				onChange={(e) => setCommand(e.target.value)}
			/>
			<CommandProcessor
				commandString={command}
				onCommandProcessed={handleCommandProcessed}
			/>
		</div>
	);
};

export default CommandInput;
