const Discussion = require('../models/Discussion');
const Comment = require('../models/Comment');

exports.createDiscussion = async (req, res) => {
  try {
    const { text, hashtags } = req.body;
    const image = req.file ? req.file.path : null;
    const newDiscussion = new Discussion({
      text,
      image,
      hashtags: hashtags.split(','),
      createdBy: req.userId
    });
    await newDiscussion.save();
    res.status(201).json(newDiscussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (req.file) updates.image = req.file.path;
    const discussion = await Discussion.findByIdAndUpdate(id, updates, { new: true });
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    await Discussion.findByIdAndDelete(id);
    res.json({ message: 'Discussion deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().populate('createdBy', 'name').populate('comments');
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.searchDiscussions = async (req, res) => {
  try {
    const { tag, text } = req.query;
    let discussions;
    if (tag) {
      discussions = await Discussion.find({ hashtags: tag });
    } else if (text) {
      discussions = await Discussion.find({ text: new RegExp(text, 'i') });
    } else {
      discussions = [];
    }
    res.json(discussions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const newComment = new Comment({
      text,
      createdBy: req.userId,
      discussion: id
    });
    await newComment.save();
    const discussion = await Discussion.findById(id);
    discussion.comments.push(newComment._id);
    await discussion.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.likeDiscussion = async (req, res) => {
  try {
    const { id } = req.params;
    const discussion = await Discussion.findById(id);
    if (!discussion.likes.includes(req.userId)) {
      discussion.likes.push(req.userId);
      await discussion.save();
    }
    res.json(discussion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
