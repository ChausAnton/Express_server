import React from "react";
import { Link } from "react-router-dom";

export const PostsList = ({posts}) => {
    if(!posts) {
        return <p className="center">Posts not found</p>
    }
    const postsPerPage = 2
    const nextPage = (parseInt(posts.CurPage) + 1) <= parseInt((posts.postsCount / postsPerPage) + 1) ? ("/home/" + (parseInt(posts.CurPage) + 1)) : "/home/" + parseInt((posts.postsCount / postsPerPage) + 1) 
    const prevPage = (parseInt(posts.CurPage) - 1) > 0 ? ("/home/" + (parseInt(posts.CurPage) - 1)) : "/home/1"
    return (
        <div>
            { posts.posts.map((post) => {
                return (
                    <Link key={post.id} to={`/detail/${post.id}`}>
                        <div>
                            <div className="divider"></div>
                            <div className="section">
                                <div className="card-panel blue darken-1 hoverable">
                                    <h3 className="white-text">{post.title}</h3>
                                    <p className="white-text flow-text">{post.content}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                )
                }) }
            <ul className="pagination">
                <li className="disabled"><a href={prevPage}><i className="material-icons">chevron_left</i></a></li>
                {Array.from({length: parseInt((posts.postsCount /postsPerPage) + 1)}, (_, i) => i + 1).map((page) => {
                    const pageUrl = "/home/" + page
                    if(parseInt(posts.CurPage) === page) {
                        return (
                            <li key={page} className="active"><a href={pageUrl}>{page}</a></li>
                        );
                    }
                    return (
                        <li key={page} className="waves-effect"><a href={pageUrl}>{page}</a></li>
                    );

                    })
                }
                <li className="waves-effect"><a href={nextPage}><i className="material-icons">chevron_right</i></a></li>
            </ul>
        </div>
    );
};