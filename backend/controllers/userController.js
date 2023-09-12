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

        res.json({
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
    res.send('register user');
});


// Post
//Log out user / clear cookie
// POST /api/users/logout
const logoutUser = asyncHandler( async (req, res) => {
    res.send('logout user');
});


//USER
// GET /api/users/profile
const getUserProfile = asyncHandler( async (req, res) => {
    res.send('get user profile');
});


//USER
// PUT /api/users/profile
const updateUserProfile = asyncHandler( async (req, res) => {
    res.send('update user profile');
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