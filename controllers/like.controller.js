const Validator  = require('fastest-validator');
const db = require('../models');
const ratingChangeMiddleware = require('../middleware/ratingChangeMiddleware');
const Likes = db.Likes

exports.getLike = async(req, res) => {
    Likes.findOne({where: {id: req.params.id}}).then((like) => {
        if(like) {
            res.status(200).send(like);
        }
        else {
            res.status(404).send("like not found");
        }
    });
};

exports.getLikes = async(req, res) => {
    Likes.findAll({}).then((likes) => {
        if(likes) {
            res.status(200).send(likes);
        }
        else {
            res.status(404).send("likes not found");
        }
    });
};

exports.getLikesForPost = async(req, res) => {
    Likes.findAll({where: {post_id: req.params.id}}).then((likes) => {
        if(likes.length > 0) {
            res.status(200).send(likes);
        }
        else {
            res.status(404).send("likes not found");
        }
    });
};

exports.getLikesForComment = async(req, res) => {
    Likes.findAll({where: {comment_id: req.params.id}}).then((likes) => {
        if(likes.length > 0) {
            res.status(200).send(likes);
        }
        else {
            res.status(404).send("likes not found");
        }
    });
};

exports.createLike = async(req, res) => {
    if(!res.locals.user) {
        return res.status(401).send({message: "only logged user can rated"});
    }

    const schema = {
        type: { type: "string", enum: [ "like", "dislike" ] },
        post_id: {type: "number", optional: true},
        comment_id: {type: "number", optional: true}
    }
    let data = {
        author_id: res.locals.user.id,
        type: req.body.type,
        post_id: req.body.post_id,
        comment_id: req.body.comment_id
    }

    const v = new Validator();
    const validationresponse = v.validate(data, schema);
    if(validationresponse !== true) {
        return res.status(400).json({
            message: "Validation fail",
            errors: validationresponse
        });
    }

    if(data.post_id && data.comment_id) {
        return res.status().send({message: "post_id and comment_id sent, only one required"})
    }

    let like = null;
    if(data.post_id) {
        like = await Likes.findOne({where: {author_id: res.locals.user.id, post_id: data.post_id}})
    }
    else {
        like = await Likes.findOne({where: {author_id: res.locals.user.id, comment_id: data.comment_id}})
    }

    
    if(!like)  {
        Likes.create(data).then((value) => {
            res.status(201).send({message: value})   
        });

        if(data.post_id)
            Likes.destroy({where: {author_id: res.locals.user.id, post_id: data.post_id}});
        else
            Likes.destroy({where: {author_id: res.locals.user.id, comment_id: data.comment_id}});

        if(data.type.localeCompare('like') == 0) 
            ratingChangeMiddleware.Change(data.post_id, data.comment_id, 1);
        else
            ratingChangeMiddleware.Change(data.post_id, data.comment_id, -1);
        
    }
    else if (data.type.localeCompare(like.type) != 0) {
        
        Likes.create(data).then((value) => {
            res.status(201).send(value)   
        });

        if(data.post_id)
            Likes.destroy({where: {author_id: res.locals.user.id, post_id: data.post_id}});
        else
            Likes.destroy({where: {author_id: res.locals.user.id, comment_id: data.comment_id}});

        if(data.type.localeCompare('like') == 0) 
            ratingChangeMiddleware.Change(data.post_id, data.comment_id, 2);
        else
            ratingChangeMiddleware.Change(data.post_id, data.comment_id, -2);
    }
    else {
        res.status(400).send({message: "error"})
    }
    

};