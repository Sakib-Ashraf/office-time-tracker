import React, {useState, useContext} from 'react';
import { CommandContext } from '../../Context/CommandContext/CommandContext';


function CommandInput () {

    const { setCommand } = useContext(CommandContext);

    const [commandInput, setCommandInput] = useState('');

    const commandOnChangeHandler = (e) => {
        setCommandInput(e.target.value);
    };

    const handleCommandSubmit = () => {
        setCommand(commandInput);
    };

  return (
		<>
			<input
				type='text'
				id='command_input'
				value={commandInput}
				onChange={commandOnChangeHandler}
			/>
			<button type='submit' onClick={() => handleCommandSubmit()}>
				Submit
			</button>
		</>
  );
}

export default CommandInput;