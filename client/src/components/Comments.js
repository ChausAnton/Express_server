import React from "react";
import { useHistory } from "react-router-dom";


export const Comments = ({comments}) => {
    const history = useHistory();
    if(!comments[0].content_comment) {
        return <p className="center">comments not found</p>
    }

    const ShowAuthorProfile = (event) => {
        history.push('/profile/' + event.target.id)
    }
    return (
        <div>
            {
                comments.map((comment, index) => {
                    const authorImage = "/image/getUserImage/" + comment.author_id_comment
                    return (
                        <div key={index}>
                            <div className="divider"></div>
                            <div className="section">
                                <div className="card-panel blue darken-1 hoverable">
                                    <div className="CommentAuthorBox">
                                        <div className="chip CommentAuthor" onClick={ShowAuthorProfile} id={comment.CommentAuthor.id}>
                                            <img src={authorImage} alt="Contact Person"/>
                                            {comment.CommentAuthor.real_name}
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="commentContent">
                                        <h3 className="white-text flow-text CommentText">{comment.content_comment}</h3>
                                        <p className="white-text flow-text">{comment.likes_comment}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}