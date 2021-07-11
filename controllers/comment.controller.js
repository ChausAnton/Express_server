const Validator  = require('fastest-validator');
const db = require('../models');
const Comment = db.Comments

exports.getComment = async(req, res) => {
    if(res.locals.user && res.locals.admin) {
        Comment.findOne({where: {id: req.params.id}}).then((comment) => {
            if(comment) {
                res.status(200).send(comment);
            }
            else {
                res.status(404).send("comment not found");
            }
        });
    }
    else {
        Comment.findOne({where: {id: req.params.id, status: "active"}}).then((comment) => {
            if(comment) {
                res.status(200).send(comment);
            }
            else {
                res.status(404).send("comment not found");
            }
        });
    }
};

exports.getComments = async(req, res) => {
    if(res.locals.user && res.locals.admin) {
        Comment.findAll({}).then((comments) => {
            if(comments) {
                res.status(200).send(comments)
            }
            else {
                res.status(404).send("comments not found")
            }
        });
    }
    else {
        Comment.findAll({where: {status: "active"}}).then((comments) => {
            if(comments) {
                res.status(200).send(comments)
            }
            else {
                res.status(404).send("comments not found")
            }
        });
    }
};


exports.createComment = async(req, res) => {
    if(res.locals.user) {
        const schema = {
            post_id: {type: "number"},
            content: {type: "string"},
        };

        let data = {
            post_id: req.body.post_id,
            author_id: res.locals.user.id,
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

        Comment.create(data);
        res.status(201).send(data);
    }
    else {
        res.status(403).send("only logged users can create posts");
    }
}

exports.updateComment = async(req, res) => {
    const schema = {
        status: { type: "string", optional: true, enum: [ "active", "inactive" ] },
        content: {type: "string", optional: true}
    }

    let data = {
        status: req.body.status,
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

    let comment = await Comment.findOne({where: {id: req.params.id}})

    if(res.locals.admin && req.body.status) {

        Comment.update({status: req.body.status}, {where: {id: req.params.id}});
    }
    
    if(res.locals.user && (req.body.title || req.body.content) && comment && comment.author_id == res.locals.user.id) {
        Comment.update({content: req.body.content}, {where: {id: req.params.id}})
    }

    if(!res.locals.admin && !res.locals.user)
        res.status(403).send("You don't have permission to change this data");
    else
        res.status(200).send("data updated");
};

exports.deleteComment = async(req, res) => {
    let comment = await Comment.findOne({where: {id: req.params.id}})

    if(!res.locals.admin && (!res.locals.user || (comment.author_id != res.locals.user.id))) {
        return res.status(401).send("Only andmin and author can delete comment");
    }
    Comment.destroy({where: {id: req.params.id}}).then(() => {
        res.status(200).send("success");
    })
};
