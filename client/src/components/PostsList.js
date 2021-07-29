import React from "react";
import { Link } from "react-router-dom";

export const PostsList = ({posts}) => {
    if(!posts.length) {
        return <p className="center">Posts not found</p>
    }


    return (
        <div>
            { posts.map((post) => {
                return (
                    <Link key={post[0].id} to={`/detail/${post[0].id}`}>
                        <div>
                            <div className="divider"></div>
                            <div className="section">
                                <div className="card-panel blue darken-1 hoverable">
                                    <h3 className="white-text">{post[0].title}</h3>
                                    <p className="white-text flow-text">{post[0].content}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
                }) }
        </div>
    );

    /* this is the second variant for displaying posts

    return (
            <div class="row">
            { posts.map((post) => {
                return (
                    
                    <div class="col s12 m4">
                        <div class="card blue darken-1 hoverable">
                            <div class="card-content white-text">
                            <span class="card-title ">{post[0].title}</span>
                            <p className="flow-text">{post[0].content}</p>
                            </div>
                            <div class="card-action">
                            <a className="flow-text" href="#">This is link</a>
                            </div>
                        </div>
                    </div>
                )
                }) }
            </div>
     );*/
};