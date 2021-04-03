import React, {useState} from 'react';
import {connect} from 'react-redux';
import {dbService, storageService} from 'fbase';
import {v4 as uuidv4} from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

function TweetFactory ({userObj}) {
    const [tweet, setTweet] = useState("");
    const [attachment, setAttachment] = useState("");
    const onSubmit = async (e) => {
        if (tweet === '') {
            return;
        }
        e.preventDefault();
        let fileURL = '';
        if (attachment !== '') {
            const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
            const res = await fileRef.putString(attachment, 'data_url');
            fileURL = await res.ref.getDownloadURL();
        }
        const tweetObj = {
            text: tweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            fileURL
        }

        await dbService.collection('Tweet').add(tweetObj);
        setTweet('');
        setAttachment('');
    }

    const onChangeTweet = (e) => {
        const {target: {value}} = e;
        setTweet(value);
    }

    const onFileChange = (e) => {
        const {target: {files}} = e;

        const file = files[0];
        const reader = new FileReader();
        reader.onloadend = (readFinishEvent) => {
            const {currentTarget: {result}} = readFinishEvent;
            setAttachment(result);
        }

        reader.readAsDataURL(file);
    }

    const onClearAttachment = () => setAttachment('');

    return (
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input className="factoryInput__input" value={tweet} onChange={onChangeTweet} type="text" placeholder="What's on your mind?" maxLength={120}/>
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{opacity: 0}}/>

            {
                attachment && 
                <div className="factoryForm__attachment">
                    <img alt="attachment" src={attachment} style={{backgroundImage: attachment}}/>
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            }
        </form>
    )
}

function mapStateToProps(state) {
    return {userObj: state.userObj};
}

export default connect(mapStateToProps)(TweetFactory);