import {MdThumbUp, MdThumbDown} from 'react-icons/md';
import {VscTrash} from 'react-icons/vsc';
import {FaRegEdit} from 'react-icons/fa';
import axios from 'axios';
import { useState } from 'react';

const Comment = ({ comment, topicID }) => {

    const [likes, setLikes] = useState(comment.likes);
    const [dislikes, setDislikes] = useState(comment.dislikes);

    const updateLikes = () => {
        axios.post('/api/rate/like', {
            userID: localStorage.getItem("userID"),
            commentID: comment.id
        }).then((response) => {
            setLikes(response.data.likes);
        });
    };

    const updateDislikes = () => {
        axios.post('/api/rate/dislike', {
            userID: localStorage.getItem("userID"),
            commentID: comment.id
        }).then((response) => {
            setDislikes(response.data.dislikes);
        });
    };

    const handleDelete = () => {
        axios.post('/api/comment/delete', {
            commentID: comment.id
        });
        document.getElementById(comment.id).remove();
    };

    return(
        <div className="comment" id={comment.id}>
            <div className="comment-content">
                <div className="comment-body" style={{color: 'black'}}>{comment.comment}</div>
                <div className="comment-footing">
                    <div>Post by: <span style={{color: 'green'}}>{"@" + comment.made_by}</span></div>
                    <div style={{display: 'flex'}}>
                        <MdThumbUp onClick={updateLikes} size={24} color='firebrick'/>
                        <div style={{marginRight: '20px', color: 'firebrick'}}>{likes}</div>
                        <MdThumbDown onClick={updateDislikes} size={24} color='navy'/>
                        <div style={{color: 'navy'}}>{dislikes}</div>
                    </div>
                </div>
            </div>
            <div className="comment-icons">
                <VscTrash onClick={handleDelete} 
                    style={{
                        display: localStorage.getItem("user") === comment.made_by ? '' : 'none', 
                        fontSize: '24px', 
                        color: 'white'
                    }}
                />
                <FaRegEdit
                    style={{
                        display: localStorage.getItem("user") === comment.made_by ? '' : 'none', 
                        fontSize: '20px', 
                        marginTop: '30px',
                        color: 'white'
                    }}
                />
            </div>
        </div>
    );
}

export default Comment;