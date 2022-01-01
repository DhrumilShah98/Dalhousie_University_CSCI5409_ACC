import React, { useEffect, useState } from "react";
import Rating from '@mui/material/Rating';
import { Container, Grow, Grid, TextField, withWidth } from "@material-ui/core";
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@material-ui/core';
import moment from 'moment';
import { useLocation } from "react-router-dom";
import useStyles from './styles';
import { display } from "@mui/system";
import { getTravelMemoryPostsComments, postTravelMemoryPostComments } from "../../../apis/travelMemoryPostDetailsAPIs";

const TravelMemoryPostDetails = () => {
    const classes = useStyles();
    const location = useLocation();
    const travelMemoryPost = location.state;
    const [commentsData, setcommentsData] = useState([]);
    const [commentText, setcommentText] = useState();

    const getAllComments = () => {
         //get api comments
         getTravelMemoryPostsComments(travelMemoryPost.postId.S).then(res => {
            setcommentsData(res.data.payload.Items);
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
       getAllComments();
    }, [])

    const handleChange = (event) => {
        const val = event.target.value;
        setcommentText(val);
    }

    const handleSubmitComment = () => {
        //post call
        if (commentText) {
            const comment = {
                "comment": commentText,
                "userId": travelMemoryPost.userId.S
            }
            postTravelMemoryPostComments(comment, travelMemoryPost.postId.S).then(res => {
                setcommentsData("");
                getAllComments();
            }).catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <Grow in>
            <Container style={{ marginTop: 20 }}>
                <Grid item xs={12} sm={6} md={4} style={{ maxWidth: "100%" }}>
                    <React.Fragment key={travelMemoryPost.postId.S}>
                        <div className="mainCommentBox" style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                            <Card className={classes.card}
                                elevation={6}
                                key={travelMemoryPost.postId.S}>
                                <CardMedia className={classes.media}
                                    image={travelMemoryPost.postImageURL.S} />
                                <div className={classes.overlay}>
                                    <Typography variant="body2">{moment(travelMemoryPost.createdAt.S).fromNow()}</Typography>
                                </div>
                            </Card>
                            <div className="commentBox" style={{ width: "800px", marginLeft: "50px" }}>
                                <h1>Comments</h1>
                                <TextField
                                    fullWidth
                                    margin="normal"
                                    id="commentBox"
                                    type="text"
                                    name="commentBox"
                                    label="Add your comments here..."
                                    variant="outlined"
                                    autoComplete="off"
                                    onChange={handleChange}
                                />
                                <Button
                                    style={{
                                        backgroundColor: "#4267B2",
                                        color: "#FFFFFF",
                                        borderRadius: 12
                                    }}
                                    variant="contained"
                                    size="small" onClick={handleSubmitComment}>
                                    Add
                                </Button>

                                {commentsData && commentsData.map((obj, index) => {
                                    return <Grid item xs={12} sm={6} md={4}>
                                        <React.Fragment >
                                            <div key={index}>
                                                {obj.comment.S}
                                            </div>
                                        </React.Fragment>
                                    </Grid>
                                })}
                            </div>
                        </div>
                        <div className="postBox" style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                            <div style={{ width: "60%", display: "flex", justifyContent: "space-between" }}>
                                <Typography gutterBottom variant="h5" component="div" style={{ fontWeight: "bold" }}>
                                    {travelMemoryPost.postName.S}
                                </Typography>
                            </div>
                            <div className="commentBox" style={{ width: "800px", marginLeft: "200px", display: "flex" }}>
                                <Typography component="h6" style={{ fontWeight: "bold" }}>Ratings</Typography>
                                <Rating
                                    name="simple-controlled"
                                />
                            </div>
                        </div>
                        <Typography component="p" style={{ width: "70%", display: "flex", justifyContent: "center" }}>
                            {travelMemoryPost.postDescription.S}
                        </Typography>
                        <Typography
                            color={"textSecondary"}
                            component="p">
                            {`${travelMemoryPost.postLocation.S}`}<br />{`${travelMemoryPost.postZipCode.S.toUpperCase()}`}
                        </Typography>
                    </React.Fragment>
                </Grid>
            </Container>
        </Grow >
    );
};

export default TravelMemoryPostDetails;
