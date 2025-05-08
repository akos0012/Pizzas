/* eslint-disable jsx-a11y/anchor-is-valid */
import {Outlet, Link, useLocation} from "react-router-dom";
import {Twitter, Facebook, Instagram} from "react-bootstrap-icons";
import {useEffect, useState} from "react";
import Dropdown from "../../Components/Dropdown";

import "./UserLayout.css";

const UserLayout = () => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const location = useLocation();

    const toggleDropdownVisibility = () => {
        setIsDropdownVisible(!isDropdownVisible);
    };


    useEffect(() => {
        window.scrollTo(0, 0);
        setIsDropdownVisible(false);
    }, [location]);

    return (
        <div>
            <div className="Layout">
                <nav>
                    <div className="container">
                        <img src="/img/favicon.png" alt="pizza logo" className="logo"/>
                        <button className="dropdown-icon-button hide-dropdown" type="button"
                                onClick={toggleDropdownVisibility}>☰
                        </button>
                        <ul className="nav-menu">
                            <li>
                                <Link to="/" className="link">Home</Link>
                            </li>
                            <li>
                                <Link to="/menu" className="link">Menu</Link>
                            </li>
                            <li>
                                <Link to="/cart" className="link">Cart</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="hide-dropdown">
                    <Dropdown isVisible={isDropdownVisible}/>
                </div>
                <div className="outlet">
                    <Outlet/>
                </div>
            </div>
            <footer>
                <div className="footer">
                    <div className="footer-content" style={{borderRight: "#fac564 solid 2px"}}>
                        <div className="footer-social row">
                            <a href="#"><Facebook/></a>
                            <a href="#"><Instagram/></a>
                            <a href="#"><Twitter/></a>
                        </div>

                        <div className="row">
                            <ul>
                                <li><a href="#">Contact us</a></li>
                                <li><a href="#">Our Services</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                                <li><a href="#">Terms & Conditions</a></li>
                                <li><a href="#">Career</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-info">
                        <p>Powered by:</p>
                        <div className="logo">
                            <a href="https://en.wikipedia.org/wiki/HTML5"><img src="/img/html.png" alt="HTML5"/></a>
                            <a href="https://en.wikipedia.org/wiki/CSS"><img src="/img/css.png" alt="CSS3"/></a>
                            <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="/img/js.png"
                                                                                                   alt="JavaScript"/></a>
                            <a href="https://react.dev/"><img src="/img/react.png" alt="React"/></a>
                            <a href="https://www.mongodb.com/"><img src="/img/mongodb.png" alt="MongoDB"/></a>
                            <a href="https://nodejs.org/en/about"><img src="/img/nodejs.png" alt="Node.js"/></a>
                            <a href="https://www.npmjs.com/about"><img src="/img/npm.png" alt="NPM"/></a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UserLayout;
