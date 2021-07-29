import React from "react";

export const PostDetail = ({post}) => {
    if(!post.length) {
        return <p className="center">Post not found</p>
    }

    return (
        <div>
            <h2>{post[0].title}</h2>
            <h2>{post[0].content}</h2>
        </div>
    );
};