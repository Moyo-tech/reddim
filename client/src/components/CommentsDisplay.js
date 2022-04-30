import React from "react";
import { useSelector} from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import CommentsAndButtons from "./CommentButtons";
import ReplyAndButtons from "./ReplyAndButtons";
import TimeAgo from "timeago-react";
import { Typography, Link } from "@material-ui/core";
import { usePostCommentsStyles } from "../styles/muiStyles";
import ForumIcon from "@material-ui/icons/Forum";

const CommentsDisplay = ({ comments, postId, isMobile }) => {
  const classes = usePostCommentsStyles();
  const user = useSelector((state) => state.user);

  const commentDetails = (by, comment) => {
    return (
      <>
        <Typography variant="caption">
          <Link component={RouterLink} to={`/u/${by.username}`}>
            {" "}
            {by.username}{" "}
          </Link>{" "}
          {` ${comment.pointsCount} ${
            comment.pointsCount === 1 ? "point" : "points"
          }•
                `}{" "}
          <TimeAgo datetime={new Date(comment.createdAt)} />{" "}
          {comment.createdAt !== comment.updatedAt && (
            <em>
              {" "}
              {" • edited"} <TimeAgo datetime={new Date(comment.updatedAt)} />{" "}
            </em>
          )}{" "}
        </Typography>{" "}
      </>
    );
  };

  return (
    <div className={classes.commentsContainer}>
      {" "}
      {comments.length !== 0 ? (
        comments.map((c) => (
          <div key={c.id} className={classes.wholeComment}>
            <div className={classes.commentWrapper}>
              <div className={classes.commentVotesWrapper}></div>{" "}
              <div className={classes.commentDetails}>
                {" "}
                {commentDetails(c.commentedBy, c)}{" "}
                <CommentsAndButtons
                  isMobile={isMobile}
                  comment={c}
                  postId={postId}
                  user={user}
                />{" "}
              </div>{" "}
            </div>{" "}
            {c.replies.map((r) => (
              <div key={r.id} className={classes.replyWrapper}>
                <div className={classes.commentVotesWrapper}>
               
                </div>{" "}
                <div className={classes.commentDetails}>
                  {" "}
                  {commentDetails(r.repliedBy, r)}{" "}
                  <ReplyAndButtons
                    isMobile={isMobile}
                    reply={r}
                    postId={postId}
                    commentId={c.id}
                    user={user}
                  />{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>
        ))
      ) : (
        <div className={classes.noCommentsBanner}>
          <ForumIcon color="primary" fontSize="large" />
          <Typography variant="h5" color="secondary">
            No Comments Yet{" "}
          </Typography>{" "}
          <Typography variant="h6" color="secondary">
            Be the first to share what you think!
          </Typography>{" "}
        </div>
      )}{" "}
    </div>
  );
};

export default CommentsDisplay;
