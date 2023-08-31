const groupModel = require('../models/group');

exports.createGroup = async (req, res, next) => {
    const groupName = req.body.groupName;
    const userId = req.body.userId;

    try {
        const response = await groupModel.create({ groupName: groupName, UserId:userId });

        return res.json({ success: true });
    } catch (err) {
        console.log(err);
    }
}

exports.getGroups = async (req, res) => {
    const userId = req.user.userId;
    try {
        const response = await groupModel.findAll({ where: { userId: userId } });
        return res.json({ groups: response });
    } catch (err) {
        console.error('Error fetching groups:', err);
        return res.status(500).json({ error: "Something went wrong while fetching groups." });
    }
}
