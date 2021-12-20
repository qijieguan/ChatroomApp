import React, { useState, useEffect } from 'react';
import Modal from "react-modal";
import { AiFillCloseSquare } from 'react-icons/ai';
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

    const [onload, setLoad] = useState(true)
    const [topics, setTopics] = useState([]);
    const [title, setTitle] = useState("");
    const [detail, setDetail] = useState("");
    const [message, setMessage] = useState("");
    const [modal, setModal] = useState(false);
    
    useEffect(() => {
        if (onload) {
            const nav = document.querySelector(".page-features");
            nav.classList.toggle("transformX");
            setLoad(false);

        }
        axios.post('http://localhost:3001/api/load_topic', {
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
        axios.post('http://localhost:3001/api/post_topic', {
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
                <div className="topic-section">
                    <label className='page-logo'>
                        {localStorage.getItem('currRoom')}
                    </label>
                    <label className="topic-logo">Topics</label>
                    {topics.length > 0 ? topics.map(topic => 
                        <Topic key={topic.id} topic={topic} roomID={props.match.params.id}/>
                    )
                        :
                        <div style={{margin: '10% 0 0 35%', fontSize: '24px'}}>There are no topics currently</div>
                    }
                </div>
                <div className="page-features">
                    <button className="post-btn" onClick={openModal}>Post</button>
                    <button className="invite-btn">Invite</button>
                </div>
            </div>
            <Modal 
                isOpen={modal} style={modalStyles}
            >
                <label style={{color: 'green', fontSize: '30px'}}>CREATE A TOPIC</label>
                <AiFillCloseSquare
                    className="close-button" 
                    onClick={closeModal}
                    size={20}
                    style={{float: 'right', backgroundColor: 'red'}}
                />
                <form onSubmit={handleSubmit}>
                    <input 
                        name="title" 
                        value={title}
                        onChange={handleChange}
                        placeholder="Enter topic title"
                    />
                    <textarea 
                        name="detail" 
                        value={detail}
                        onChange={handleChange}
                        placeholder="Enter additional details (optional)"
                        style={{height: '23vh'}}
                    /> 
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