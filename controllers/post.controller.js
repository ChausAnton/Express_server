const Validator  = require('fastest-validator');
const db = require('../models');
const User = db.User;
const Post = db.Post

exports.getPost = async(req, res) => {
    if(res.locals.user && res.locals.admin) {
        Post.findOne({where: {id: req.params.id}}).then((post) => {
            if(post) {
                res.status(200).send(post);
            }
            else {
                res.status(404).send("post not found");
            }
        });
    }
    else {
        Post.findOne({where: {id: req.params.id, status: "active"}}).then((post) => {
            if(post) {
                res.status(200).send(post);
            }
            else {
                res.status(404).send("post not found");
            }
        });
    }
};

exports.getPosts = async(req, res) => {
    if(res.locals.user && res.locals.admin) {
        Post.findAll({}).then((post) => {
            if(post) {
                res.status(200).send(post)
            }
            else {
                res.status(404).send("posts not found")
            }
        });
    }
    else {
        Post.findAll({where: {status: "active"}}).then((post) => {
            if(post) {
                res.status(200).send(post)
            }
            else {
                res.status(404).send("posts not found")
            }
        });
    }
};

exports.createPost = async(req, res) => {
    if(res.locals.user) {
        const schema = {
            title: {type: "string"},
            content: {type: "string"},
        };

        let data = {
            author_id: res.locals.user.id,
            title: req.body.title,
            content: req.body.content,
            likes: 0,
            status: "active",
        };

        const v = new Validator();
        const validationresponse = v.validate(data, schema);
        if(validationresponse !== true) {
            return res.status(400).json({
                message: "Validation fail",
                errors: validationresponse
            });
        }

        Post.create(data);
        res.status(201).send(data);
    }
    else {
        res.status(403).send("only logged users can create posts");
    }
}

exports.updatePost = async(req, res) => {
    const schema = {
        status: { type: "string", optional: true, enum: [ "active", "inactive" ] },
        title: {type: "string", optional: true},
        content: {type: "string", optional: true}
    }

    let data = {
        status: req.body.status,
        title: req.body.title,
        content: req.body.content
    }

    const v = new Validator();
    const validationresponse = v.validate(data, schema);
    if(validationresponse !== true) {
        return res.status(400).json({
            message: "Validation fail",
            errors: validationresponse
        });
    }

    let post = await Post.findOne({where: {id: req.params.id}})

    if(res.locals.admin && req.body.status) {

        Post.update({status: req.body.status}, {where: {id: req.params.id}});
    }
    
    if(res.locals.user && (req.body.title || req.body.content) && post && post.author_id == res.locals.user.id) {
        Post.update({title: req.body.title, content: req.body.content}, {where: {id: req.params.id}})
    }

    if(!res.locals.admin && !res.locals.user)
        res.status(403).send("You don't have permission to change this data");
    else
        res.status(200).send("data updated");
};

exports.deletePost = async(req, res) => {
    let post = await Post.findOne({where: {id: req.params.id}})

    if(!res.locals.admin && (!res.locals.user || (post.author_id != res.locals.user.id))) {
        return res.status(401).send("Only andmin and author can delete post");
    }
    Post.destroy({where: {id: req.params.id}}).then(() => {
        res.status(200).send("success");
    })
};