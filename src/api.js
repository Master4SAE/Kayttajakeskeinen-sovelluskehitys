import express from 'express'
const router = express.Router();

// Mock data
const mediaItems = require('./media/allMockData');
const users = require('./users/mock-users');

// API endpoint to get all media items
router.get('/media', (req, res) => {
    res.status(200).json(mediaItems);
});

// API endpoint to get one media item
router.get('/media/:id', (req, res) => {
    const { id } = req.params;
    const mediaItem = mediaItems.find(item => item.media_id === parseInt(id, 10));
    if (mediaItem) {
        res.status(200).json(mediaItem);
    } else {
        res.status(404).json({ error: 'Media item not found' });
    }
});

// API endpoint to add a new media item
router.post('/media', (req, res) => {
    const newMediaItem = req.body;
    mediaItems.push(newMediaItem);
    res.status(201).json(newMediaItem);
});

// API endpoint to modify a media item
router.put('/media/:id', (req, res) => {
    const { id } = req.params;
    const updatedMediaItem = req.body;
    const index = mediaItems.findIndex(item => item.media_id === parseInt(id, 10));
    if (index !== -1) {
        mediaItems[index] = { ...mediaItems[index], ...updatedMediaItem };
        res.status(200).json(mediaItems[index]);
    } else {
        res.status(404).json({ error: 'Media item not found' });
    }
});

// API endpoint to delete a media item
router.delete('/media/:id', (req, res) => {
    const { id } = req.params;
    const index = mediaItems.findIndex(item => item.media_id === parseInt(id, 10));
    if (index !== -1) {
        const deletedItem = mediaItems.splice(index, 1)[0];
        res.status(200).json(deletedItem);
    } else {
        res.status(404).json({ error: 'Media item not found' });
    }
});

// Similar endpoints for user operations

module.exports = router;
