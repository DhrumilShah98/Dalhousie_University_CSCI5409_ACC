/* Dhrumil Amish Shah */
import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@material-ui/core';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles.js';

const TravelMemoryPost = ({ travelMemoryPost }) => {
    const classes = useStyles();
    const navigate = useNavigate();

    const viewDetails = () => {
        if (travelMemoryPost.postId.S !== undefined) {
            navigate(`/post/${travelMemoryPost.postId.S}`, { state: travelMemoryPost });
        }
    };

    return (
        <Card className={classes.card}
            elevation={6}
            key={travelMemoryPost.postId.S}>
            <CardMedia className={classes.media}
                image={travelMemoryPost.postImageURL.S} />
            <div className={classes.overlay}>
                <Typography variant="body2">{moment(travelMemoryPost.createdAt.S).fromNow()}</Typography>
            </div>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {travelMemoryPost.postName.S}
                </Typography>
                <Typography variant="body2"
                    color={"textSecondary"}
                    component="p">
                    {`${travelMemoryPost.postLocation.S}`}<br />{`${travelMemoryPost.postZipCode.S.toUpperCase()}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    style={{
                        backgroundColor: "#4267B2",
                        color: "#FFFFFF",
                        borderRadius: 12
                    }}
                    variant="contained"
                    size="small"
                    onClick={viewDetails}>
                    View
                </Button>
            </CardActions>
        </Card>
    );
};

export default TravelMemoryPost;