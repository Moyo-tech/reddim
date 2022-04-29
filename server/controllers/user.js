const User = require('../models/user');
const Post = require('../models/post');
const { cloudinary, UPLOAD_PRESET } = require('../utils/config');
const paginateResults = require('../utils/paginateResults');

const getUser = async(req, res) => {
    const { username } = req.params;
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    const user = await User.findOne({
        username: { $regex: new RegExp('^' + username + '$', 'i') },
    });

    if (!user) {
        return res
            .status(404)
            .send({ message: `Username '${username}' does not exist on server.` });
    }

    const postsCount = await Post.find({ author: user.id }).countDocuments();
    const paginated = paginateResults(page, limit, postsCount);
    const userPosts = await Post.find({ author: user.id })
        .sort({ createdAt: -1 })
        .select('-comments')
        .limit(limit)
        .skip(paginated.startIndex)
        .populate('author', 'username')
        .populate('subreddit', 'subredditName');

    const paginatedPosts = {
        previous: paginated.results.previous,
        results: userPosts,
        next: paginated.results.next,
    };

    res.status(200).json({ userDetails: user, posts: paginatedPosts });
};

module.exports = { getUser };