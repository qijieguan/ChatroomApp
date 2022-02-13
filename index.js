const express = require('express');
const app = express();
const mysql = require("mysql");
const path  =  require('path');
const cors = require('cors');
require('dotenv').config();

const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json()); 

const db = mysql.createConnection({ 
    user: process.env.USER_VAL,
    host: process.env.HOST_VAL,
    password: process.env.PASSWORD_VAL,
    database: process.env.DATABASE_VAL 
}); 

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/api/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const image_url = req.body.image_url;
    db.query("SELECT * FROM user WHERE username = ?",
        username,
        (err, result) => {
            if (err) {console.log(err);}
            if (result.length > 0) {
                res.send({message: "Username already taken!", error: true});
            }
            else {
                bcrypt.hash(password, saltRounds, (err, hash) => {
                    if (err) {console.log(err);}
                    else {    
                        db.query("INSERT INTO user (username, password, image_url) VALUES (?,?,?)",
                            [username, hash, image_url],
                            (err, result) => {
                                if (err) {console.log(err);}
                            }
                        );
                        res.send({message: "User is successfully registered", error: false});
                    }
                })
            }
        });
    }
)

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.send({auth: false, message: "Token is needed. Please resend it to us!", error: true});
    }
    else {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.send({auth: false, message: "Authentication failed. Please try again!", error: true});
            }
            else {
                req.userID = decoded.id;
                next();
            }
        });
    }
}

app.get('/api/auth', verifyJWT, (req, res) => {
    res.send({auth: true, message: "User is authenticated!"});
});

app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query("SELECT * FROM user WHERE username = ?",
        username,
        (err, result) => {
            if (err) {console.log(err);}
            if (result.length <= 0) {
                res.send({message: "Invalid username!", error: true});
            }
            else {
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if (response) {
                        const id = result[0].id;
                        const url = result[0].image_url;
                        const token = jwt.sign({id}, process.env.JWT_SECRET, 
                            {expiresIn: 300}
                        );
                        res.send({message: "Ready to Authenticate", userID: id, url: url, token: token, error: false});
                    }
                    else {
                        res.send({message: "Invalid username/password combination!", error: true});
                    }
                })
            }
        });
    }
)

app.post('/api/load', (req, res) => {
    const userID = req.body.userID;
    let getRoom = [];
    db.query("SELECT * from room", 
        (err, result) => {
            if (err) {console.log(err);}
            for(i = 0; i < result.length; ++i) {
                let parsedUID = result[i].users_by_id.split('*');
                for (j = 0; j < parsedUID.length; ++j) {
                    if (parsedUID[j] === userID) {
                        getRoom.push(result[i]);
                        break;
                    }
                } 
            }
            res.send(getRoom); 
        }
    );
});

app.post('/api/create', (req, res) => {
    const host = req.body.host;
    const subject = req.body.subject;
    const desc = req.body.desc;
    const privacy = req.body.privacy;
    const users_by_id = req.body.users_by_id;
    db.query(
        "INSERT INTO room (host, subject, description, privacy, size, users_by_id) VALUES (?,?,?,?,?,?)",
        [host, subject, desc, privacy, 1, users_by_id],
        (err, result) => {
            if (err) {console.log(err);}
            res.send("Room is successfully created!");
        }
    );
});

app.get('/api/join', (req, res) => {
    db.query("SELECT * from room WHERE privacy = ?",
        "public",
        (err, result) => {
            if (err) {console.log(err);}
            res.send(result);
        }
    );
});

app.post('/api/join', (req, res) => {
    const userID = "*" + req.body.userID;
    const roomID = req.body.roomID;
    db.query("UPDATE room SET users_by_id = CONCAT(users_by_id, ?) WHERE id = ?",
        [userID, roomID],
        (err, result) => {
            if (err) {console.log(err);}
            res.send("Joined room successfully!");
        }
    );
});

app.post('/api/load_topic', (req, res) => {
    const roomID = req.body.roomID;
    db.query("SELECT * from topic WHERE room_id = ?",
        roomID,
        (err, result) => {
            if (err) {console.log(err);}
            res.send(result);
        }    
    )
});

app.post('/api/post_topic', (req, res) => {
    const title = req.body.title;
    const detail = req.body.detail;
    const room_id = req.body.room_id;
    const user = req.body.user;
    db.query("INSERT INTO topic (title, detail, room_id, made_by) VALUES (?,?,?,?)",
        [title, detail, room_id, user],
        (err, result) => {
            if (err) {console.log(err);}
            res.send("Topic posted successfully!");
        }
    );
});

app.post('/api/load_members', (req, res) => {
    const roomID = req.body.roomID;
    db.query("SELECT users_by_id from room WHERE id = ?",
        roomID,
        (err, result) => {
            if (err) {console.log(err);}
            let parsedUID = result[0].users_by_id.split('*');
            db.query("SELECT * from user WHERE id = ? OR id = ?",
            [parsedUID[0], parsedUID[1]],
            (err, result) => {
                if (err) {console.log(err);}
                res.send(result);
            }
        );
        }    
    )
});

app.post('/api/load_comment', (req, res) => {
    const topic_id = req.body.topic_id;
    db.query("SELECT * from comment WHERE topic_id = ?",
        topic_id,
        (err, result) => {
            if (err) {console.log(err);}
            res.send(result);
        }
    );
});

app.post('/api/post_comment', (req, res) => {
    const comment = req.body.comment;
    const topic_id = req.body.topic_id;
    const user = req.body.user;
    db.query("INSERT INTO comment (comment, likes_by_id, dislikes_by_id, topic_id, made_by, likes, dislikes) VALUES (?,?,?,?,?,?,?)",
        [comment, "", "", topic_id, user, 0, 0],
        (err, result) => {
            if (err) {console.log(err);}
            res.send("Comment posted successfully!");
        }
    );
});

app.post('/api/rate/like', (req, res) => {
    const userID = req.body.userID;
    const commentID = req.body.commentID;
    db.query("SELECT * from comment WHERE id = ?",
        commentID,
        (err, result) => {
            if (err) {console.log(err);}
            let parsedUID = result[0].likes_by_id.split('*');
            let likeCount = result[0].likes;
            if (parsedUID.length == 1 && parsedUID[0] == '') {
                parsedUID[0] = userID;
                ++likeCount;
            }
            else {
                for (i = 0; i < parsedUID.length; ++i) {
                    if (parsedUID[i] == userID) {
                        parsedUID.splice(i, 1);
                        --likeCount;
                        break;
                    }
                }
            }
            let likes_by_id = parsedUID.join("*");
            db.query("UPDATE comment SET likes_by_id = ?, likes = ? WHERE id = ?",
                [likes_by_id, likeCount, result[0].id],
                (err, result) => { 
                    if (err) {console.log(err);}
                    res.send({msg: "Ratings updated!", likes: likeCount})
                }
            );
        }
    );
});

app.post('/api/rate/dislike', (req, res) => {
    const userID = req.body.userID;
    const commentID = req.body.commentID;
    db.query("SELECT * from comment WHERE id = ?",
        commentID,
        (err, result) => {
            if (err) {console.log(err);}
            let parsedUID = result[0].dislikes_by_id.split('*');
            let dislikeCount = result[0].dislikes;
            if (parsedUID.length == 1 && parsedUID[0] == '') {
                parsedUID[0] = userID;
                ++dislikeCount;
            }
            else {
                for (i = 0; i < parsedUID.length; ++i) {
                    if (parsedUID[i] == userID) {
                        parsedUID.splice(i, 1);
                        --dislikeCount;
                        break;
                    }
                }
            }
            let dislikes_by_id = parsedUID.join("*");
            db.query("UPDATE comment SET dislikes_by_id = ?, dislikes = ? WHERE id = ?",
                [dislikes_by_id, dislikeCount, result[0].id],
                (err, result) => {
                    if (err) {console.log(err);}
                    res.send({msg: "Ratings updated!", dislikes: dislikeCount})
                }
            );
        }
    );
});

app.post('/api/comment/delete', (req, res) => {
    const commentID = req.body.commentID;
    db.query("DELETE from comment WHERE id = ?",
        commentID,
        (err, result) => {
            if (err) {console.log(err);}
        }
    );
});


app.get('*', (req, res) => {res.sendFile(path.join(__dirname+'/client/build/index.html'));});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {console.log(`server running on ${PORT}`);});
