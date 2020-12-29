import React, { useState, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Divider, Button, Chip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import EditPostForm from "./EditPostForm";
import { fetchSinglePost, deletePost } from "../actions/post";
import noImage from "../images/noimage.svg";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(3),
    marginBottom: theme.spacing(8),
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
  },
  content: {
    marginTop: theme.spacing(3),
  },
  image: {
    width: "100%",
    borderRadius: 5,
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(4),
  },
  chip: {
    marginTop: theme.spacing(1),
  },
}));

const PostDetails = ({ history, location, match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();

  const currentPost = useSelector((state) => state.posts.currentPost);

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  const convertRelativeTime = (date) => {
    return moment(date).fromNow();
  };

  const removePost = () => {
    dispatch(deletePost(currentPost._id));
    history.push("/posts");
  };

  const openEditMode = () => {
    setEditMode(true);
  };

  const closeEditMode = () => {
    setEditMode(false);
  };

  const classes = useStyles();
  return (
    <Paper className={classes.paper} elevation={0}>
      {editMode ? (
        <EditPostForm post={currentPost} closeEditMode={closeEditMode} />
      ) : (
        <div>
          <div className={classes.header}>
            <Typography variant="h5" gutterBottom>
              {currentPost?.title}
            </Typography>
            <div>
              <Button
                color="primary"
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={openEditMode}
              >
                Düzenle
              </Button>{" "}
              <Button
                color="secondary"
                variant="outlined"
                onClick={removePost}
                startIcon={<DeleteIcon />}
              >
                Sil
              </Button>
            </div>
          </div>

          <Divider />
          <Typography variant="overline" gutterBottom>
            {currentPost?.subtitle}
          </Typography>
          <Typography variant="caption" component="p" gutterBottom>
            {convertRelativeTime(currentPost?.createdAt)} by Didem
          </Typography>
          <Chip
            label={`# ${currentPost?.tag}`}
            variant="outlined"
            className={classes.chip}
          />

          <div className={classes.content}>
            <img
              src={currentPost?.image || noImage}
              alt="Post"
              className={classes.image}
            />
            <Typography variant="body1" gutterBottom>
              {currentPost?.content}
            </Typography>
          </div>
        </div>
      )}
    </Paper>
  );
};

export default PostDetails;
