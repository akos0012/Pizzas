import React from 'react';
import { Link } from "react-router-dom";
import "./Dropdown.css"

function Dropdown({ isVisible }) {
    return (
        <div className="dropdown">
            {isVisible ? (
                <ul>
                    <li>
                        <Link to="/" className="link">
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/menu" className="link">
                            <span>Menu</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart" className="link">
                            <span>Cart</span>
                        </Link>
                    </li>
                </ul>
            ) : null}
        </div>
    );
}

export default Dropdown;