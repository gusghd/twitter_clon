import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function Navigation({userObj}) {
    return (
        <>
            <nav>
                <ul className="navigation-ul">
                    <li><Link className="navigation-link" to="/"><FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" /></Link></li>
                    <li><Link className="navigation-link link-profile" to="/profile"><FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" /><span>{userObj.displayName ? `${userObj.displayName}'s Profile` : 'Profile'}</span></Link></li>
                </ul>
            </nav>
        </>
    )
}

function mapStateToProps(state) {
    return {userObj: state.userObj};
  }

export default connect(mapStateToProps)(Navigation)