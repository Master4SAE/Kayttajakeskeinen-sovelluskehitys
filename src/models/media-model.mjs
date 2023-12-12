import db from '../../database/db.js'
  
  const listAllMedia = async () => {
    try {
      const [results, fields] = await db.execute('SELECT * FROM media_items');
      return results;
    } catch (error) {
      console.error('Error retrieving media items:', error);
      throw error;
    }
  };

  const addMedia = async (media) => {
    const {filename, title, description} = media;
    
    const sql = 'INSERT INTO media_items (filename, title, description) VALUES (?, ?, ?)';
    const values = [media.filename, media.title, media.description];
    const [results, fields] = await db.execute(sql, values);
    return results;
  };
  
  const findMediaById = async (id) => {
    const [results, fields] = await db.execute(`SELECT * FROM media_items WHERE media_id = ${id}`);
      return results;
  };

  const updateMediaById = async (id, item) => {
    try {
      // Check if the media item exists
      const [existingResults, existingFields] = await db.execute(`SELECT * FROM media_items WHERE media_id = ${id}`);
      
      if (existingResults.length === 0) {
        throw new Error(`Media item with ID ${id} not found`);
      }
  
      // Update the media item
      const updateQuery = `
        UPDATE media_items
        SET
          filename = ?,
          title = ?,
          description = ?
        WHERE
          media_id = ?
      `;
  
      const updateValues = [item.filename, item.title, item.description, id];
  
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
  const deleteMediaById = async (id) => {
    try {
      // Check if the media item exists
      const [existingResults, existingFields] = await db.execute(`SELECT * FROM media_items WHERE media_id = ${id}`);
      
      if (existingResults.length === 0) {
        throw new Error(`Media item with ID ${id} not found`);
      }
      const deleteQuery = 'DELETE FROM media_items WHERE media_id = ?';
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

  export {listAllMedia, findMediaById, addMedia, updateMediaById, deleteMediaById};