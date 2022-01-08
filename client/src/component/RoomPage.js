import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import { AiFillCloseSquare } from 'react-icons/ai';
import axios from 'axios';
import { uuid } from 'react-uuid';
import Topic from './Topic.js';
import Category from './Category.js';

const Page = (props) => {

    const modalStyles = {
        content : {
        top : '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '70%',
        height: '70%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        alignItem: 'center',
        justifyContent: 'space-around' 
        }
    };

    const [topics, setTopics] = useState([]);
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [members, setMembers] = useState([]);
    const [modal, setModal] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        axios.post('/api/load_topic', {
            roomID: props.match.params.id
        }).then((response) => {
            setTopics(response.data);
        });

        axios.post('/api/load_members', {
            roomID: props.match.params.id
        }).then((response) => {
            setMembers(response.data);
        });
    }, [props.match.params.id, update]);

    Modal.setAppElement(document.getElementById('root'));

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setTitle("");
        setDetail("");
        setModal(false);
    }

    const handleChange = event => {
        if (event.target.name === "title") {
            setTitle(event.target.value);
        }
        else {
            setDetail(event.target.value);
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (!title) {return;}
        axios.post('/api/post_topic', {
            title: title,
            detail: detail,
            room_id: props.match.params.id,
            user: localStorage.getItem("user")
        });
        closeModal();
        setUpdate(!update);
    }

    return (
        <div className="page-container">
            <div className="topic-section">
                <label className='page-label'>{localStorage.getItem('currRoom')}</label>
                <label className="topic-label">Topics</label>
                {topics.length > 0 ? topics.map(topic => 
                    <Topic key={topic.id} topic={topic} roomID={props.match.params.id}/>
                )
                    :
                    <div style={{textAlign: 'center', fontSize: '30px'}}>There are no topics currently</div>
                }
            </div>
            <div className="page-features">
                <button className="post-btn" onClick={openModal}>Post</button>
                <div className="member-label">Members</div>
                {members.map(member => <li className='member'>{'@' + member.username}</li>)}
            </div>
        
            <Modal 
                isOpen={modal} style={modalStyles}
            >
                <label style={{color: 'green', fontSize: '30px'}}>CREATE A TOPIC</label>
                <AiFillCloseSquare
                    className="close-button" 
                    onClick={closeModal}
                    size={20}
                    style={{float: 'right', color: 'white', backgroundColor: 'red'}}
                />
                <form onSubmit={handleSubmit}>
                    <input name="title" style={{marginTop: '40px', height: '40px', fontSize: '18px'}}
                        value={title}
                        onChange={handleChange}
                        placeholder="Enter topic title"
                    />
                    <textarea name="detail" style={{marginTop: '20px', height: '200px', fontSize: '16px'}}
                        value={detail}
                        onChange={handleChange}
                        placeholder="Enter additional details (optional)"
                    />
                    <label style={{display: 'block', fontSize: '24px', color: 'black', margin: '40px 0 10px 0'}}>
                        Pick one to represent topic<span style={{color: 'red', fontSize: '24px'}}>*</span>
                    </label>
                    <Category/>
                    
                    <button type="submit" 
                        style={{margin: '10px 0 0 75%', backgroundColor: 'green', height: '40px', width: '80px'}}
                    >SUBMIT</button> 
                </form>
            </Modal>
        </div>
    );
};

export default Page;