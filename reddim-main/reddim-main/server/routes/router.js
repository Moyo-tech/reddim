const express = require('express');
const { loginUser, signupUser } = require('../controllers/auth');

const { auth } = require('../utils/middleware');
const {
    getPosts,
    getSubscribedPosts,
    getSearchedPosts,
    getPostAndComments,
    createNewPost,
    updatePost,
    deletePost,
} = require('../controllers/post');
const { upvotePost, downvotePost } = require('../controllers/postVote');
const {
    postComment,
    deleteComment,
    updateComment,
    postReply,
    deleteReply,
    updateReply,
} = require('../controllers/postComment');
const {
    getSubreddits,
    getSubredditPosts,
    getTopSubreddits,
    createNewSubreddit,
    editSubDescription,
    subscribeToSubreddit,
} = require('../controllers/subreddit');

const {
    getUser,
} = require('../controllers/user');
const router = express.Router();

//auth
router.post('/signup', signupUser);
router.post('/login', loginUser);

//post
//CRUD posts routes
router.get('/reddim/posts/', getPosts);
router.get('/reddim/posts/search', getSearchedPosts);
router.get('/reddim/posts/:id/comments', getPostAndComments);
router.get('/reddim/posts/subscribed', auth, getSubscribedPosts);
router.post('/reddim/posts/', auth, createNewPost);
router.patch('/reddim/posts/:id', auth, updatePost);
router.delete('/reddim/posts/:id', auth, deletePost);

//posts vote routes
router.post('/reddim/posts/:id/upvote', auth, upvotePost);
router.post('/reddim/posts/:id/downvote', auth, downvotePost);

//post comments routes
router.post('/reddim/posts/:id/comment', auth, postComment);
router.delete('/reddim/posts/:id/comment/:commentId', auth, deleteComment);
router.patch('/reddim/posts/:id/comment/:commentId', auth, updateComment);
router.post('/reddim/posts/:id/comment/:commentId/reply', auth, postReply);
router.delete('/reddim/posts/:id/comment/:commentId/reply/:replyId', auth, deleteReply);
router.patch('/reddim/posts/:id/comment/:commentId/reply/:replyId', auth, updateReply);

//Subreddit
router.get('/reddim/subreddits/', getSubreddits);
router.get('/reddim/subreddits/g/:subredditName', getSubredditPosts);
router.get('/reddim/subreddits/top10', getTopSubreddits);
router.post('/reddim/subreddits/', auth, createNewSubreddit);
router.patch('/reddim/subreddits/:id', auth, editSubDescription);
router.post('/reddim/subreddits/:id/subscribe', auth, subscribeToSubreddit);

//User
router.get('/reddim/users/:username', getUser);



module.exports = router;

