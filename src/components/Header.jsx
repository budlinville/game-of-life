import React from 'react';

export const Header = ({ children }) => {
    return (
        <div>
            <h1>Game of Life</h1>
            <hr />
            { children }
        </div>
    )
};

export default Header;