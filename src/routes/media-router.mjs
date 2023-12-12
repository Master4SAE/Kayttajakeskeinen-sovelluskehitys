import express from 'express';
import {
  getMedia,
  getMediaById,
  postMedia,
  putMedia,
  deleteMedia,
} from '../controllers/media-controller.mjs';

const mediaRouter = express.Router();

mediaRouter.route('/').get(getMedia).post(postMedia);

mediaRouter.route('/:id')
  .get(getMediaById)
  .put(putMedia)
  .delete(deleteMedia);

mediaRouter.route('/login').get(getMedia).post(postMedia);

export default mediaRouter;