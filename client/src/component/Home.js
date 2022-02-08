import { GoCommentDiscussion } from 'react-icons/go';

export default function Home() {
    return (
        <div className="home">
            <p className="intro">
                Welcome to my Q & A service! 
                Discuss your topics here!
            </p>
            <GoCommentDiscussion className='discussion-icon' size={200}/>
        </div>
    );
};