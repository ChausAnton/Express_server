import React from "react";
import { Link, useHistory} from "react-router-dom";

export const PostsList = ({posts, category}) => {
    const history = useHistory();

    if(!posts) {
        return <p className="center">Posts not found</p>
    }
    if(!category)
        category = "";

    const openUser = (event) => {
        event.preventDefault();
        history.push('/profile/' + event.target.id)
    }

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
                                    <div className="CardContentBox">
                                        <div className="PostContentBox">
                                            <div className="PostTitleBox">
                                                <h3 className="white-text">{post.title}</h3>
                                            </div>
                                            <div className="PostContentBox">
                                                <p className="white-text flow-text">{post.content}</p>
                                            </div>
                                        </div>
                                        <div className="PostInforBox">
                                            <div className="ChipPostUserBox">
                                                <div className="chip UserChipBox" onClick={openUser} id={post.author_id}>
                                                    <img src={`/image/getUserImage/${post.author_id}`} alt="Contact Person" />
                                                    {post.real_name}
                                                </div>
                                            </div>
                                            <div className="ChipPostDateBox">
                                                <div className="chip DateChipBox">
                                                    Posted on: {post.createdAt.split("T")[0]}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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