import React, { useState } from 'react';
import { useSelector, connect } from 'react-redux';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import TextField from '@material-ui/core/TextField';
import { Fab } from '@material-ui/core';

import Comment from './Comment.jsx';


const useStyles = makeStyles({
  itemWrap: {
    background: '#fdfdfd',
    marginBottom: 15,
    minWidth: 350,
  },
  itemActions: {
    justifyContent: 'space-between',
    display: 'flex',
  },
  itemDiv: {
    marginTop: 8,
    marginBottom: 8,
  },
});

const CommentsModal = (props) => {
  const currentComments = useSelector(state => state.currentComments);
  const commentsArray = currentComments.map(el => <Comment text={el.text}/>)
  return (
    <div>CommentsModal! (box)
      {commentsArray}
      <TextField variant="filled"/>
      <Fab color="primary" aria-label="add">
        submit
        {/* <AddIcon /> */}
      </Fab>

    </div>
  )
}

export default CommentsModal;