import { listAllUsers, addUser, findUserById, updateUserById, deleteUserById } from "../models/user-model.mjs";

const getUsers = async (req, res) => {
  const userData = await listAllUsers();
  res.json(userData);
};

const postUsers = (req, res) => {
  const user = req.body;
  if (user) {
    addUser(user);
    res.status(201);
    res.json({message: 'New media item added.'})
  } else {
    res.sendStatus("itCame here",400);  
  }
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user.length > 0) {
    res.json(user);
  } else {
    res.sendStatus(404, 'user not found.');
  }
};


const putUser = async (req, res) => {
  try {
    // Check if the user exists
    const existingUser = await findUserById(req.params.id);

    if (existingUser.length <= 0) {
      // Media item not found
      return res.status(404).send('Media not found.');
    }

    // Update the media item
    const updatedUser = {
      username: req.body.username,
      password: req.body.password
    };

    await updateUserById(req.params.id, updatedUser);

    res.json({ message: `user with ID ${req.params.id} updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const deleteUser = async (req, res) => {
  try {
    const id = await deleteUserById(req.params.id);
  
    // If deleteMediaById is successful, send the response
    res.json({ message: id });
  } catch (error) {
    // If an error occurs or the media item is not found, send a 404 response
    console.error(error);
    res.status(404).send('Media not found.');
  }
};

export {getUsers, getUserById, postUsers, putUser, deleteUser};