import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import Comment from './Comment.js'; 

const Expand = (props) => {

    const [comment, setComment] = useState("");
    const [commentList, setCommentList] = useState([]);
    const [update, setUpdate] = useState(false);

    useEffect (() => {
        axios.post('/api/load_comment', {
            topic_id: props.match.params.id
        }).then((response) => {
            if (response.data) {
                setCommentList(response.data);
            }
        });
    }, [props.match.params.id, update]);

    const handleChange = event => {
        setComment(event.target.value);
    }

    const handleSubmit = event => {
        event.preventDefault();
        if (!comment) {return;}
        axios.post('/api/post_comment', {
            comment: comment,
            topic_id: props.match.params.id,
            user: localStorage.getItem("user")
        });
        setComment("");
        setUpdate(!update);
    }

    return (
        <div className="topic-expand">
            <div className="topic-title">
                {useLocation().state.topic.title}
            </div>
            <div className="topic-detail">
                <div style={{marginBottom: '10px', minHeight: '80px'}}>
                    {useLocation().state.topic.detail}
                </div>
                <div style={{color: 'green', marginLeft: '75%'}}>@{useLocation().state.topic.made_by}</div>
            </div>
            <label className="comment-label">COMMENTS</label>
            <div className="comment-list">
                {commentList.length > 0 ? commentList.map(comment =>
                    <Comment key={comment.id} comment={comment} topicID={props.match.params.id}/>
                )
                    :
                    <div style={{margin: '50px 0'}}>There are no comments on this topic!</div>
                } 
            </div>
            <div className="reply-box">
                <textarea style={{height: '60px'}} 
                    onChange={handleChange} 
                    value= {comment}
                    placeholder="Write your reply..."/>
                <button 
                    style={{height: '60px', width: '60px', color: 'white', backgroundColor: 'green'}} 
                    onClick={handleSubmit}
                >Enter</button>
            </div>
        </div>
    );
}

export default Expand;