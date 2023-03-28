/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useContext, useEffect} from 'react';
import { CommandContext } from '../../Context/CommandContext/CommandContext';
import { TimerContext } from '../../Context/TimerContext/TimerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

function CommandInput () {

    const { action, command, setCommand } = useContext(CommandContext);
    const {
        halftime,
		TimeProcessor,
		handleCommand,
		setHalftime,
		FormatElapsedTime,
    } = useContext( TimerContext );
    
    const [commandInput, setCommandInput] = useState('');

    const commandOnChangeHandler = (e) => {
        setCommandInput(e.target.value);
    };

    const handleCommandSubmit = () => {
        setCommand(commandInput);
    };

    useEffect(() => {
        const { date, time, timezone, period } = TimeProcessor(command);
        let startTime = `${date} ${time} ${period} ${timezone}`;
        FormatElapsedTime(startTime);
        handleCommand(action);
    }, [action, setCommand]);

    const handleHalfTime = (e) => {
        let time = e.target.value * 60 * 60 * 1000;
        setHalftime(time);
    };

  return (
		<>
			<label htmlFor='halftime'>Halftime Value (in hrs): </label>
			<input
				type='number'
				id='halftime'
				value={halftime / (60 * 60 * 1000)}
				onChange={handleHalfTime}
			/>
			<div className='flex w-full justify-center items-center'>
				<label htmlFor='command_input' className='visually-hidden'>
					Your Status Command Input
				</label>
              <input
                  className='w-full rounded-xl flex justify-center items-center p-2'
					type='text'
					id='command_input'
					value={commandInput}
					onChange={commandOnChangeHandler}
					placeholder='Your Status Command Input Here...'
				/>
				<button
					className='flex justify-center items-center p-2'
					type='submit'
                  onClick={() => handleCommandSubmit()}
                  title='submit'
				>
					<FontAwesomeIcon
						className='menu_dots'
						icon={faPaperPlane}
					/>
				</button>
			</div>
		</>
  );
}

export default CommandInput;