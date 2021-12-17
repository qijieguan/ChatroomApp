import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import {FaTimes} from 'react-icons/fa';
import axios from 'axios';
import Topic from './Topic.js';

const Page = (props) => {

    const modalStyles = {
        content : {
        top : '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '50%',
        height: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        alignItem: 'center',
        justifyContent: 'space-around' 
        }
    };

    const [topics, setTopics] = useState([]);
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [message, setMessage] = useState("");
    const [modal, setModal] = useState(false);

    useEffect(() => {
        axios.post('/api/load_topic', {
            roomID: props.match.params.id
        }).then((response) => {
            setTopics(response.data);
        });
    }, [props.match.params.id]);

    Modal.setAppElement(document.getElementById('root'));

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const handleChange = event => {
        event.preventDefault();
        if (event.target.name === "title") {
            setTitle(event.target.value);
        }
        else {
            setDetail(event.target.value);
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (!title) {
            setMessage('Invalid title input!');
            console.log(message);
            return;
        }
        axios.post('/api/post_topic', {
            title: title,
            detail: detail,
            room_id: props.match.params.id,
            user: localStorage.getItem("user")
        });
        setTitle("");
        setDetail("");
        closeModal();
        window.location.reload();
    }

    return (
        <div className="page-container">
            <div className="page-divider">
                <div className='page-logo'>
                    {localStorage.getItem('currRoom')}
                </div>
                <div className="page-features">
                    <button className="post-btn" onClick={openModal}>
                        POST
                    </button>
                    <div style={{display: 'flex'}}>
                        <input 
                            placeholder="@username"
                        />
                        <button className="invite-btn">
                            Invite
                        </button>
                    </div>
                </div>
                <div className="topic-section">
                <div className="topic-logo">Topics</div>
                    {topics.length > 0 ? topics.map(topic => 
                        <Topic key={topic.id} topic={topic} roomID={props.match.params.id}/>
                    )
                        :
                        <div style={{margin: '10% 0 0 35%', fontSize: '24px'}}>There are no topics currently</div>
                    }
                </div>
            </div>
            <Modal 
                isOpen={modal}
                style={modalStyles}
            >
                <div style={{color: 'green', fontSize: '30px', textAlign: 'center', fontWeight: 'bold'}}>
                    CREATE A TOPIC
                </div>
                <button onClick={closeModal} className="close-button" style={{margin: '0 0 25px 0', marginLeft: '96%'}}>
                    <FaTimes/>
                </button>
                <form onSubmit={handleSubmit}>
                    <input 
                        name="title" 
                        value={title}
                        onChange={handleChange}
                        placeholder="Enter topic title"
                    />
                    <br/><br/><br/><br/>
                    <textarea 
                        name="detail" 
                        value={detail}
                        onChange={handleChange}
                        placeholder="Enter additional details (optional)"
                        style={{height: '23vh'}}
                    /> 
                    <br/><br/><br/>
                    <button 
                        type="submit" 
                        style={{marginLeft: '85%', backgroundColor: 'green', color: 'white', height: '40px', width: '80px'}}
                    >SUBMIT</button> 
                </form>
            </Modal>
        </div>
    );
};

export default Page;