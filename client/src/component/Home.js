
export default function Home() {
    return (
        <div>
            <div className="front-page">
                WELCOME TO MY WEB APP!
            </div>
            <div>
                <ul className="sample-login">
                    <li style={{marginTop: '35px', fontWeight: 'bold'}}>
                        Sample Login:
                    </li>
                    <li style={{margin: '20px 0'}}>
                        Username: user#1
                    </li>
                    <li style={{margin: '20px 0 20px 15px'}}>
                        Password: password
                    </li>
                </ul>
            </div>
        </div>
    );
};