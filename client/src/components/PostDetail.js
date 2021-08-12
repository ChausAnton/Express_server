import React from "react";

export const PostDetail = ({post}) => {
    if(!post) {
        return <p className="center">Post not found</p>
    }

    console.log( post);

    return (
        <div>
            <h2>{post.Post_data.title}</h2>
            <h2>{post.Post_data.content}</h2>
        </div>
    );
};