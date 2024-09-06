const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");
const { formatDate } = require("../../utils/helpers");
const { Comment } = require("../../models");

router.post("/:postId/comments", async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;

  try {
    if (!req.session.logged_in) {
      return res
        .status(401)
        .json({ message: "You must be logged in to comment." });
    }

    const newComment = await Comment.create({
      content,
      post_id: postId,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const posts = await Post.findAll({});

    const formattedPosts = posts.map((post) => {
      const postJson = post.toJSON();
      return {
        ...postJson,
        createdAt: formatDate(new Date(postJson.createdAt)),
      };
    });

    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const PostData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!PostData) {
      res.status(404).json({ message: "No Post found with this id!" });
      return;
    }

    res.status(200).json(PostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
