import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import {AuthContext} from '../context/AuthContext'
import { useMessage } from "../hooks/message.hook";

export const Comments = ({comments}) => {
    const {error, clearError, request} = useHttp();
    const history = useHistory();
    const {token} = useContext(AuthContext);
    const message = useMessage();
    const {id} = useParams();

    useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const [form, setForm] = useState ( {
        content_comment: '', post_id_comment: id
    });

    useEffect( () => {
        window.M.updateTextFields()
    }, []);

    if(!comments) {
        return <p className="center">comments not found</p>
    }

    const chengeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    };

    const ShowAuthorProfile = (event) => {
        history.push('/profile/' + event.target.id)
    }

    const setLikeDislike = async(type, commentID) => {
        try {
            await request('/like/createLike', 'POST', {type: type, comment_id: commentID}, {'x-access-token': token})
        }
        catch (e) {}
    }

    const AddComment = async() => {
        try {
            await request('/comment/createComment', 'POST', {...form}, {'x-access-token': token})
        }
        catch (e) {}
    };

    const likeDislikeHandler = (event) => {
        setLikeDislike(event.target.id.split(' ')[0], event.target.id.split(' ')[1])
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
                                        <div className="chip CommentAuthor" onClick={ShowAuthorProfile} id={comment.author_id_comment}>
                                            <img src={authorImage} alt="Contact Person"/>
                                            {comment.real_name}
                                        </div>
                                    </div>
                                    <br/>
                                    <div className="commentContent">
                                        <h3 className="white-text flow-text CommentText">{comment.content_comment}</h3>
                                        <div className="RatingChipBox">
                                            <div className=" chip">
                                                <div className="Like" onClick={likeDislikeHandler}>
                                                    <i className="material-icons" id={`like ${comment.id}`}>arrow_upward</i>
                                                </div>
                                                <div className="RatingContainer">
                                                    <span className="flow-text">{comment.likes_comment}</span>
                                                </div>
                                                <div className="Dislike" onClick={likeDislikeHandler}>
                                                    <i className="material-icons" id={`dislike ${comment.id}`}>arrow_downward</i>
                                                </div>
                                            </div>
                                        </div>     
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <div className="AddCommentBox blue darken-2">
                <div className="input-field">
                    <input placeholder="Comment" 
                        id="content_comment" 
                        type="text" 
                        name="content_comment" 
                        className="yellow-input white-text" 
                        onChange={chengeHandler} 
                        />

                    <label htmlFor="content_comment">input your Comment</label>
                </div>
                <button className="btn grey lighten-1"
                        onClick={AddComment}
                    >
                    Add comment</button>
            </div>
        </div>
    );
}