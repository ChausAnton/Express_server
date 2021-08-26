const db = require('../models');
const Comment = db.Comments
const Likes = db.Likes
const Post = db.Post
const User = db.User;

exports.Change = async(post_id, comment_id, number) => {
    let author_id = 0;

    if(post_id) {
        const post = await Post.findOne({where: {id: post_id}});
        author_id = post.author_id

        Post.update({likes: (post.likes + number)}, {where: {id: post_id}});
    }
    else {
        const comment = await Comment.findOne({where: {id: comment_id}});
        author_id = comment.author_id_comment
        
        Comment.update({likes_comment: (comment.likes_comment + number)}, {where: {id: comment_id}});
    }
    console.log(author_id)
    User.findOne({where: {id: author_id}}).then((user) => {
        if(user)
            User.update({rating: (user.rating + number)}, {where: {id: user.id}})
    });
    
};