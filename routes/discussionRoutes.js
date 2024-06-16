const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // for handling images

router.post('/discussion', authMiddleware, upload.single('image'), discussionController.createDiscussion);
router.put('/discussion/:id', authMiddleware, upload.single('image'), discussionController.updateDiscussion);
router.delete('/discussion/:id', authMiddleware, discussionController.deleteDiscussion);
router.get('/discussions', authMiddleware, discussionController.getDiscussions);
router.get('/discussions/search', authMiddleware, discussionController.searchDiscussions);
router.post('/discussion/:id/comment', authMiddleware, discussionController.addComment);
router.post('/discussion/:id/like', authMiddleware, discussionController.likeDiscussion);

module.exports = router;
