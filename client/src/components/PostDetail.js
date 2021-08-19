import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { Comments } from "./Comments";
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const PostDetail = ({post}) => {
    const history = useHistory();
    const {token} = useContext(AuthContext);
    const {request, error, clearError} = useHttp();
    const message = useMessage();

    useEffect( () => {
        message(error);
        clearError();
    }, [error, message, clearError]);

    const setLikeDislike = async(type) => {
        try {
            await request('/like/createLike', 'POST', {type: type, post_id: post.Post_data.post_id}, {'x-access-token': token})
        }
        catch (e) {}
    }

    if(!post) {
        return <p className="center">Post not found</p>
    }

   const likeDislikeHandler = (event) => {
        setLikeDislike(event.target.id)
   }

    const authorImage = "/image/getUserImage/" + post.Author_data.author_id;

    const ShowAuthorProfile = () => {
        history.push('/profile/' + post.Author_data.author_id)
    }

    const ShowPostsByCategory = (event) => {
        history.push('/home/1/' + event.target.childNodes[0].nodeValue)
    }



    return (
        <div className="center">
            <div className="col s4 m4">
                <div className="card">
                    <div className="CardTopBackgroud">
                        <div className="PostDate">
                            <div className="chip">
                                <span>Posted on: {post.createdAt.split('T')[0]}</span>
                            </div>
                        </div>
                        <div className="PostAuthor">
                            <div className="chip" onClick={ShowAuthorProfile}>
                                <img src={authorImage} alt="Contact Person" />
                                {post.Author_data.real_name}
                            </div>
                        </div>
                        <div className="Categoies">
                        {
                            post.Categories_data.map((category, index) => {
                                return (
                                    <div key={index} className="PostCategory">
                                        <div className="chip Category" onClick={ShowPostsByCategory}>
                                            {category.category_title}
                                        </div>
                                    </div>
                                )
                            })
                        }
                        </div>
                        <div className="PostTitleContainer">
                            <div className="PostTitle">
                                <span className="card-title Title">{post.Post_data.title}</span>
                            </div>
                        </div>
                    </div>
                    <div className="card-content CardContent blue darken-2">
                        <h3 className="white-text flow-text PostContent">{post.Post_data.content}</h3>
                        <div className="RaitingBox">
                            <div className="Like" id={1} onClick={likeDislikeHandler} >
                                <i className="material-icons white-text" id='like'>arrow_upward</i>
                            </div>
                            <div className="RatingBox">
                                <span className="white-text flow-text">{post.Post_data.likes}</span>
                            </div>
                            <div className="Dislike" onClick={likeDislikeHandler} id={-1}>
                                <i className="material-icons white-text" id="dislike">arrow_downward</i>
                            </div>
                        </div>               
                    </div>
                </div>
            </div>
            <Comments comments={post.Comments_data}/>
        </div>
    );//arrow_drop_down arrow_drop_up
};