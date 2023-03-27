import React, {useContext} from 'react';
import { TimerContext } from '../../Context/TimerContext/TimerContext';

function Status () {
    const {
		date,
		time,
		timezone,
		period,
		handleStart,
		handlePause,
		handleResume,
		handleEnd,
		elapsedTime,
    } = useContext( TimerContext );
    
    const secondsToHms = (d) => {
		d = Number(d);
		var h = Math.floor(d / 3600);
		var m = Math.floor((d % 3600) / 60);
		var s = Math.floor((d % 3600) % 60);

		var hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours, ') : '';
		var mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes, ') : '';
		var sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : '';
		return hDisplay + mDisplay + sDisplay;
    };
    
  return (
		<>
			<div>
				<p>Date: {date}</p>
				<p>
					Time: {time} {period}
				</p>
				<p>Timezone: {timezone}</p>
			</div>
			<div>
				<div>Time: {secondsToHms(elapsedTime / 1000)} </div>
				<div>
					<button
						type='button'
						onClick={() => handleStart(Date.now())}
					>
						Start
					</button>
					<button type='button' onClick={() => handlePause()}>
						Pause
					</button>
					<button type='button' onClick={() => handleResume()}>
						Resume
					</button>
					<button type='button' onClick={() => handleEnd()}>
						End
					</button>
				</div>
			</div>
		</>
  );
}

export default Status;