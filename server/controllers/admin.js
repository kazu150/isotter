const User = require('../models/user');

exports.signup = (req, res, next) => {
    const userName = req.body.userName;
    const thumb = req.body.thumb;
    const user = new User({
        userName: userName,
        thumb: thumb
    })
    user
        .save()
        .then(result => {
            res.status(201).json({
                message: 'user successfully created',
                user: result
            })
        })
        .catch(err => console.log(err))
};

// loginとuserStatusのcontrollerで、かなりやっていることがかぶっているので、リファクタの方法がわかったらしたい
exports.login = async (req,res,next) => {
    const userName = req.body.userName;
    const user = await User.find({userName: userName});

    res.status(201).json({
        message: 'result of login validation',
        user: user
    })
}

exports.showUserStatus = async (req, res, next) => {
    const userName = req.params.userName;
    const user = await User.find({userName: userName});

    res.status(201).json({
        message: 'show user status',
        user: user
    })
}

exports.updateUserStatus = async (req, res, next) => {
    const user = req.body.user;
    console.log(user)
    const userDoc = await User.findById(user._id);
    console.log(userDoc)
    userDoc.overwrite(user);
    const newUser = await userDoc.save()
    console.log(newUser)
    

    res.status(201).json({
        message: 'update succeeded!',
        user: newUser
    })
}