import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

//Auth user & get token
// POST /api/users/login
const authUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if(user && (await user.matchPassword(password))){
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        //Set JWT as HTTP-Only Cookie
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
        });

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});


//Register user
// POST /api/users
const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    });

    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });

    //Set JWT as HTTP-Only Cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    });

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


// Post
//Log out user / clear cookie
// POST /api/users/logout
const logoutUser = asyncHandler( async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });

    // drugi nacin res.clearCookie('jwt');

    res.status(200).json({ message: 'Logged out successfully' })
});


//USER
// GET /api/users/profile
const getUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


//USER
// PUT /api/users/profile
const updateUserProfile = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if(req.body.password){
            user.password = req.body.password;
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });

    } else {
        res.status(404);
        throw new Error('User not found');
    }
});


//Private/Admin
// GET /api/users
const getUsers = asyncHandler( async (req, res) => {
    res.send('get users');
});


//Private/Admin
// GET /api/users/:id
const getUserByID = asyncHandler( async (req, res) => {
    res.send('get user by id');
});


//Private/Admin
// DELETE /api/users/:id
const deleteUser = asyncHandler( async (req, res) => {
    res.send('delete users');
});


//UPDATE
//Private/Admin
// PUT /api/users/:id
const updateUser = asyncHandler( async (req, res) => {
    res.send('update users');
});


export {
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    updateUser,
    getUsers,
    getUserByID,
    deleteUser,
}