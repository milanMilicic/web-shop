import express from 'express'
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    updateUser,
    getUsers,
    getUserByID,
    deleteUser, } from '../controllers/userController.js';
const router = express.Router();

router.route('/').post(registerUser).get(getUsers); //GET by ADMIN, NOT USER
router.post('/logout', logoutUser);
router.post('/login', authUser);
router.route('/profile').get(getUserProfile).put(updateUserProfile);
router.route('/:id').delete(deleteUser).get(getUserByID).put(updateUser);

export default router;