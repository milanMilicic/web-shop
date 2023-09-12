import asyncHandler from '../middleware/asyncHandler.js'
import User from '../models/userModel.js'

//Auth user & get token
// POST /api/users/login
const authUser = asyncHandler( async (req, res) => {
    res.send('auth user');
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