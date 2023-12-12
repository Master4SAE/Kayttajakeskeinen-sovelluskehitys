import {addMedia, findMediaById, listAllMedia, updateMediaById, deleteMediaById} from "../models/media-model.mjs";

const getMedia = async (req, res) => {
  const mediaData = await listAllMedia();
  res.json(mediaData);
};

const postMedia = (req, res) => {
  const {filename} = req.body;
  if (filename) {
    addMedia(req.body);
    res.status(201);
    res.json({message: 'New media item added.'})
  } else {
    res.sendStatus(400);  
  }
};

const getMediaById = async (req, res) => {
  const media = await findMediaById(req.params.id);
  if (media) {
    res.json(media);
  } else {
    res.sendStatus(404, 'Media not found.');
  }
};


const putMedia = async (req, res) => {
  try {
    const mediaId = req.params.id;
    
    // Check if the media item exists
    const existingMediaItem = await findMediaById(mediaId);

    if (!existingMediaItem) {
      // Media item not found
      return res.status(404).send('Media not found.');
    }

    // Update the media item
    const updatedItem = {
      filename: req.body.filename,
      title: req.body.title,
      description: req.body.description,
    };

    await updateMediaById(mediaId, updatedItem);

    res.json({ message: `Media item with ID ${mediaId} updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


const deleteMedia = async (req, res) => {
  try {
    const id = await deleteMediaById(req.params.id);
  
    // If deleteMediaById is successful, send the response
    res.json({ message: id });
  } catch (error) {
    // If an error occurs or the media item is not found, send a 404 response
    console.error(error);
    res.status(404).send('Media not found.');
  }
};

export {getMedia, getMediaById, postMedia, putMedia, deleteMedia};