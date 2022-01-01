/* Dhrumil Amish Shah */
import React, { useEffect, useState } from "react";
import { Button, Container, Grow, Grid, TextField } from "@material-ui/core";
import TravelMemoryPosts from "../TravelMemoryPosts/TravelMemoryPosts";
import TravelMemoryForm from "../TravelMemoryForm/TravelMemoryForm";
import { getTravelMemoryPosts } from '../../../apis/travelMemoryPostAPIs';
import useStyles from "./styles.js";

const TravelMemoryHome = () => {
    const [travelMemoryPosts, setTravelMemoryPosts] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        getAllTravelMemoryPosts();
    }, []);

    async function getAllTravelMemoryPosts() {
        await getTravelMemoryPosts()
            .then((res) => {
                const responseExists = res.data !== null || res.data !== undefined;
                if (responseExists) {
                    res.data.payload.Items.forEach((item) => {
                        item.display = true;
                    });
                }
                setTravelMemoryPosts(res.data.payload.Items);
            })
            .catch((err) => {
                console.log(err);
                setTravelMemoryPosts([]);
            });
    };

    return (
        <Grow in>
            <Container style={{ marginTop: 56 }}>
                <Grid container
                    direction="row"
                    justify="space-between"
                    alignItems="center">
                    <Grid item xs={12} sm={12} md={2}>
                        <Button
                            style={{
                                marginTop: "8px",
                                backgroundColor: "#4267B2",
                                color: "#FFFFFF",
                                height: 55,
                                width: 180
                            }}
                            variant="contained"
                            size="large">
                            View My Posts
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={10}>
                        <TextField
                            fullWidth
                            margin="normal"
                            id="search"
                            type="text"
                            name="search"
                            label="Search by Location/Zip-code"
                            variant="outlined"
                            autoComplete="off" />
                    </Grid>
                </Grid>
                <Grid
                    className={classes.mainContainer}
                    container
                    justifyContent="space-between"
                    alignItems="stretch">
                    <Grid item xs={12} md={7}>
                        <TravelMemoryPosts travelMemoryPosts={travelMemoryPosts} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TravelMemoryForm travelMemoryPosts={travelMemoryPosts} setTravelMemoryPosts={setTravelMemoryPosts} />
                    </Grid>
                </Grid>
            </Container>
        </Grow>
    );
};

export default TravelMemoryHome;
