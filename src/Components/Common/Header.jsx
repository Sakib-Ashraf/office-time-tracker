import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
  return (
        <header className='header_content_wrapper'>
            <h1>Office Time Tracker</h1>
            <div className='header_menu_trigger'>
                <FontAwesomeIcon className="menu_dots" icon={faEllipsisV} />
            </div>
        </header>
  );
}

export default Header