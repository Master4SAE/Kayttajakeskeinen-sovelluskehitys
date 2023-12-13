import db from '../../database/db.js'
  
  const listAllUsers = async () => {
    try {
      const [results, fields] = await db.execute('SELECT * FROM users');
      return results;
    } catch (error) {
      console.error('Error retrieving user:', error);
      throw error;
    }
  };

  const addUser = async (user) => {
    const {username, password} = user;
    
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    const values = [user.username, user.password];
    const [results, fields] = await db.execute(sql, values);
    return results;
  };
  
  const findUserById = async (id) => {
    const [results, fields] = await db.execute(`SELECT * FROM users WHERE user_id = ${id}`);
      return results;
  };

  const updateUserById = async (id, item) => {
    try {
      // Check if the media item exists
      const [existingResults, existingFields] = await db.execute(`SELECT * FROM users WHERE user_id = ${id}`);
      
      if (existingResults.length === 0) {
        throw new Error(`Media item with ID ${id} not found`);
      }
  
      // Update the User
      const updateQuery = `
        UPDATE users
        SET
          username = ?,
          password = ?
        WHERE
          user_id = ?
      `;
  
      const updateValues = [item.username, item.password, id];
  
      const [updateResults, updateFields] = await db.execute(updateQuery, updateValues);
  
      // Check if the update was successful
      if (updateResults.affectedRows === 1) {
        return `Media item with ID ${id} updated successfully`;
      } else {
        throw new Error(`Failed to update media item with ID ${id}`);
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      throw new Error('Error updating media item');
    }

  };
  const deleteUserById = async (id) => {
    try {
      // Check if the media item exists
      const [existingResults, existingFields] = await db.execute(`SELECT * FROM users WHERE user_id = ${id}`);
      
      if (existingResults.length === 0) {
        throw new Error(`Media item with ID ${id} not found`);
      }
      const deleteQuery = 'DELETE FROM users WHERE user_id = ?';
      const [results, fields] = await db.execute(deleteQuery, [id]);
  
      // Check if the update was successful
      if (results.affectedRows === 1) {
        return `Media item with ID ${id} deleted successfully`;
      } else {
        throw new Error(`Failed to delete media item with ID ${id}`);
      }
    } catch (error) {
      // Handle errors
      console.error(error);
      throw new Error('Error deleting media item');
    }
  };

  export {listAllUsers, findUserById, addUser, updateUserById, deleteUserById};