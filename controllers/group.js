const groupModel = require('../models/group');
const userGroupModel = require('../models/userGroup');

exports.createGroup = async (req, res, next) => {
    const groupName = req.body.groupName;
    const userId = req.body.userId;

    try {
        const response = await groupModel.create({ groupName: groupName });

        if (response) {


            const responseOfUserGroupModel = await userGroupModel.create({ GroupId: response.id, UserId: userId });



            if (responseOfUserGroupModel) {
                console.log("userGroupModelCreated");
            }

        }
        //store id to userGroup 
        return res.json({ success: true });
    } catch (err) {
        console.log(err);
    }
}

exports.getGroups = async (req, res) => {
    const userId = req.user.userId;
    try {
        // Find all groups associated with the given user
        const response = await groupModel.findAll({
            //have to set the relation, think about that relation which will give u userID, groupName 
        });



        return res.json({ groups: response});
    } catch (err) {
        console.error('Error fetching groups:', err);
        return res.status(500).json({ error: "Something went wrong while fetching groups., query didnt work" });
    }
};
