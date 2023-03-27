import React from 'react';
import Main from './Container/Main.jsx';
import { CommandProvider } from './Context/CommandContext/CommandContext.jsx';
import { TimerProvider } from './Context/TimerContext/TimerContext.jsx';

function App() {
	return (
			<CommandProvider>
				<TimerProvider>
					<Main/>
				</TimerProvider>
			</CommandProvider>
	);
}

export default App;
