import express from 'express';
import {
  getUsers, 
  getUserById, 
  postUsers, 
  putUser, 
  deleteUser
} from '../controllers/user-controller.mjs';

const userRouter = express.Router();

userRouter.route('/').get(getUsers).post(postUsers);

userRouter.route('/:id')
  .get(getUserById)
  .put(putUser)
  .delete(deleteUser);



export default userRouter;