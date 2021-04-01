import { dbService, storageService } from 'fbase';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

function Tweet({userObj, tweet}) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [newTweet, setNewTweet] = useState(tweet.text);

    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this tweet?");
        if (ok) {
            await dbService.doc(`Tweet/${tweet.id}`).delete();
            await storageService.refFromURL(tweet.fileURL).delete();
        }
        
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        await dbService.doc(`Tweet/${tweet.id}`).update({
            text: newTweet
        });

        setIsEditMode(false);
    }
    const onChange = (e) => {
        const {target: {value}} = e;
        setNewTweet(value);
    }
    const onToggleMode = () => setIsEditMode(prev => !prev);
    return (
        <>
        <div className="tweet">
            {
                isEditMode ? 
                <>
                <form onSubmit={onSubmit} className="container tweetEdit">
                    <input type="text" onChange={onChange} value={newTweet} autoFocus className="formInput"/>
                    <input type="submit" value="Apply" className="formBtn"/>
                    <span onClick={onToggleMode} className="formBtn cancelBtn">Cancel</span>
                </form>
                </>
                :
                <>
                <h4>{tweet.text}</h4>
                {
                    tweet.fileURL && <img alt="tempFile" src={tweet.fileURL} />
                }
                { (userObj.uid === tweet.creatorId) ?
                    <div className="tweet__actions">
                        <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                        <span onClick={onToggleMode}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </span>
                    </div>
                    : <></>
                }
                </>
        }
        </div>
        </>
    )
}

function mapStateToProps(state) {
    return {userObj: state.userObj};
  }

export default connect(mapStateToProps)(Tweet)