import React, { useState} from 'react';
import { useHistory } from 'react-router';
import {connect} from 'react-redux';
import { authService } from 'fbase';
import {setUserInfo} from 'store';

function Profile({userObj, setUser}) {

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const history = useHistory();
    const onClickLogout = () => {
        authService.signOut();
        history.push('/');
    }
    // const getMyTweets = async () => {
    //     const tweets = await dbService.collection('Tweet').where('creatorId', '==', userObj.uid).orderBy('createdAt', 'desc').get();
    //     const myTweets = tweets.docs.map(doc => doc.data());
    //     console.log(myTweets);
    // }

    const onDisplayNameChange = (e) => {
        const {target: {value}} = e;
        setNewDisplayName(value);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName
            });
            
            const user = authService.currentUser;
            setUser({
                uid: user.uid,
                displayName: user.displayName,
                updateProfile: (args) => user.updateProfile(args)
            });
        }
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit} class="profileForm">
                <input type="text" autoFocus placeholder="Display Name" value={newDisplayName} onChange={onDisplayNameChange} className="formInput" />
                <input type="submit" value="Update Profile" className="formBtn" style={{marginTop: 10}}/>
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onClickLogout}>Log out</span>
        </div>
    )
}
function mapStateToProps(state) {
    return {userObj: state.userObj};
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        setUser: (user) => dispatch(setUserInfo(user))
    }
}
  

export default connect(mapStateToProps, mapDispatchToProps)(Profile)