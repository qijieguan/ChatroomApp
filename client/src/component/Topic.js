import { Link } from "react-router-dom";

const Topic = ({ topic, roomID }) => {
    return (
        <div>
            <Link className='topic' to={{pathname: `/room/${roomID}/topic/${topic.id}`, state: {topic: topic}}}>
                {topic.title}
            </Link>
        </div>
    );
}

export default Topic;