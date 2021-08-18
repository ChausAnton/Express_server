import React from "react";
import { Link} from "react-router-dom";

export const PostsList = ({posts, category}) => {

    if(!posts) {
        return <p className="center">Posts not found</p>
    }

    if(!category)
        category = "";

    const postsPerPage = 2

    const numberOfPages = (posts.postsCount % postsPerPage) === 0 ? (posts.postsCount / postsPerPage) : parseInt((posts.postsCount / postsPerPage) + 1);
    const nextPage = (parseInt(posts.CurPage) + 1) <= numberOfPages ? `/home/${(parseInt(posts.CurPage) + 1)}/${category}` : `/home/${numberOfPages}/${category}`;
    const prevPage = (parseInt(posts.CurPage) - 1) > 0 ? `/home/${(parseInt(posts.CurPage) - 1)}/${category}` :  `/home/1/${category}`;
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
                                <div className="chip">
                                    <img src="/image/getUserImage/1" alt="Contact Person" />
                                    Jane Doe
                                </div>
                            </div>
                        </div>
                    </Link>
                )
                }) }
            <ul className="pagination">
                <li className="disabled"><a href={prevPage}><i className="material-icons">chevron_left</i></a></li>
                {Array.from({length: numberOfPages}, (_, i) => i + 1).map((page) => {
                    let pageUrl;
                    if(category) 
                        pageUrl = "/home/" + page + '/' + category
                    else 
                        pageUrl = "/home/" + page
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