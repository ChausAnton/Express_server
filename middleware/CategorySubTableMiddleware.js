const db = require('../models');
const Category_sub_table = db.Category_sub_table;

exports.addCategory = async(CategroyJson, postID) => {
    Category_sub_table.destroy({where: {post_id: postID}}).then(async() => {
        for(const [key, value] of Object.entries(CategroyJson)) {
            $data = {
                post_id: postID,
                category_id: value
            };
            try {
                await Category_sub_table.create($data);
            }
            catch (e) {
                console.log(e);
            }
        }
    });
};

exports.getCategoriesForPost = async(postID) => {
    return await Category_sub_table.findAll({where: {post_id: postID}})
};