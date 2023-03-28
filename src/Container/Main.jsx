/* eslint-disable react-hooks/exhaustive-deps */
// @ts-nocheck
import React from 'react';
import CommandInput from "../Components/CommandInterface/CommandInput";
import Status from "../Components/StatusInterface/Status";
import Aside from './Aside';
import Body from './Body';
import Header from '../Components/Common/Header';

const Main = () => {
  return (
		<main className='flex h-screen bg-gray-100 w-full'>
			<Aside>
				<Status />
			</Aside>
			<Body>
				<Header />
				<CommandInput />
			</Body>
		</main>
  );
}

export default Main;