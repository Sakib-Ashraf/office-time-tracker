import React from 'react';

function Aside({children}) {
  return (
		<aside
			id='default-sidebar'
			class='fixed top-0 left-0 z-40 h-screen transition-transform -translate-x-full sm:translate-x-0 w-1/4 bg-cyan-700 p-4 bottom-0 overflow-y-auto'
			aria-label='Sidebar'
		>
			{children}
		</aside>
  );
}

export default Aside;