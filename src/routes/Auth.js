import AuthForm from 'components/AuthForm';
import { authService, firebaseInstance } from 'fbase';
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

function Auth() {

    const onClickOtherLogin = async (event) => {
        const {target: {name}} = event;
        let provider;

        if (name === 'google') {
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new firebaseInstance.auth.GithubAuthProvider();
        }

        await authService.signInWithPopup(provider);
    }

    return (
    <div className="authContainer">
        <FontAwesomeIcon
            icon={faTwitter}
            color={"#04AAFF"}
            size="3x"
            style={{ marginBottom: 30 }}
        />
        <AuthForm />
        <div className="authBtns">
            <button className="authBtn" onClick={onClickOtherLogin} name="google">Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
            <button className="authBtn" onClick={onClickOtherLogin} name="github">Continue with Github <FontAwesomeIcon icon={faGithub} /></button>
        </div>
    </div>)
    
};

export default Auth