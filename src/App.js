import React from 'react';
import TimeProcessor from './Components/Timer/TimeProcessor';
import CommandInput from './Components/Command/CommandInput';

function App() {
	return (
		<div>
			<TimeProcessor inputString='Mar 16, 2023 - Signing In at 4:12 PM (Bangladesh Time)' />

			<CommandInput />
		</div>
	);
}

export default App;
