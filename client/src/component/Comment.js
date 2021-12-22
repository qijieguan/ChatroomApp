import {MdThumbUp, MdThumbDown} from 'react-icons/md';
import {VscTrash} from 'react-icons/vsc';
import {FaRegEdit} from 'react-icons/fa';
import axios from 'axios';
import { useState } from 'react';

const Comment = ({ comment, topicID }) => {

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

    const updateLikes = () => {
        axios.post('http://localhost:3001/api/rate/like', {
            userID: localStorage.getItem("userID"),
            topicID: topicID
        }).then((response) => {
            setLikes(response.data.likes);
        });
    };

    const updateDislikes = () => {
        axios.post('http://localhost:3001/api/rate/dislike', {
            userID: localStorage.getItem("userID"),
            topicID: topicID
        }).then((response) => {
            setDislikes(response.data.dislikes);
        });
    };

    const handleDelete = () => {
        axios.post('http://localhost:3001/api/comment/delete', {
            commentID: comment.id
        });
        window.location.reload();
    };

    return(
        <div className="comment">
            <div className="comment-content">
                <p className="comment-body">
                    {comment.comment}
                </p>
                <div className="comment-footing">
                    <div>Post by: <span style={{color: 'green'}}>{comment.made_by}</span></div>
                    <div style={{display: 'flex'}}>
                        <MdThumbUp onClick={updateLikes}
                            size={24}
                            color='blue'
                        />
                        <div style={{marginRight: '20px'}}>{likes}</div>
                        <MdThumbDown onClick={updateDislikes}
                            size={24}
                            color='red'
                        />
                        <div>{dislikes}</div>
                    </div>
                </div>
            </div>
            <div className="comment-icons">
                <VscTrash onClick={handleDelete} 
                    style={{
                        display: localStorage.getItem("user") === comment.made_by ? '' : 'none', 
                        fontSize: '20px', 
                        marginTop: '20px'
                    }}
                />
                <FaRegEdit
                    style={{
                        display: localStorage.getItem("user") === comment.made_by ? '' : 'none', 
                        fontSize: '18px', 
                        marginTop: '20px'
                    }}
                />
            </div>
        </div>
    );
}

export default Comment;