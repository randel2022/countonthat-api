const User = require('../models/user');


// @route GET admin/user
// @desc Returns all users
// @access Public
exports.index = async function (req, res) {
    // const users = await User.find({});
    res.status(200).json({message: "nice"});
};

// @route GET api/user/{id}
// @desc Returns a specific user
// @access Public
exports.show = async function (req, res) {
    try {
        const id = req.params.id;

        const user = await User.findById(id);

        if (!user) return res.status(401).json({message: 'User does not exist'});

        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};