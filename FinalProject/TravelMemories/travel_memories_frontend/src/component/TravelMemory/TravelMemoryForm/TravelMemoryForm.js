/* Dhrumil Amish Shah */
import React, { useState } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { postTravelMemoryPost } from '../../../apis/travelMemoryPostAPIs';
import useStyles from './styles.js';
import Navigation from '../TravelMemoryUserManagement/Navigation';

const TravelMemoryForm = ({ travelMemoryPosts, setTravelMemoryPosts }) => {
    const classes = useStyles();
    const [formData, setFormData] = useState({ postName: '', postDescription: '', postLocation: '', postZipCode: '', postImage: '' });
    const [errors, setErrors] = useState({ postNameValid: false, postDescriptionValid: false, postLocationValid: false, postZipCodeValid: false, postImageValid: false });

    const validateFormData = () => {
        if (errors.postNameValid && errors.postDescriptionValid && errors.postLocationValid && errors.postZipCodeValid && errors.postImageValid) {
            return true;
        } else {
            return false;
        }
    };

    const clearFormData = () => {
        setFormData({ postName: '', postDescription: '', postLocation: '', postZipCode: '', postImage: '' });
        setErrors({ postNameValid: false, postDescriptionValid: false, postLocationValid: false, postZipCodeValid: false, postImageValid: false });
    }

    const validate = (e) => {
        switch (e.target.name) {
            case "postName":
                if (e.target.value === "" || e.target.value === null) {
                    errors["postName"] = "Post name is required."
                    errors["postNameValid"] = false;
                } else {
                    errors["postName"] = "";
                    errors["postNameValid"] = true;
                }
                break;
            case "postDescription":
                if (e.target.value === "" || e.target.value === null) {
                    errors["postDescription"] = "Post description is required."
                    errors["postDescriptionValid"] = false;
                } else {
                    errors["postDescription"] = "";
                    errors["postDescriptionValid"] = true;
                }
                break;
            case "postLocation":
                if (e.target.value === "" || e.target.value === null) {
                    errors["postLocation"] = "Post location is required."
                    errors["postLocationValid"] = false;
                } else {
                    errors["postLocation"] = "";
                    errors["postLocationValid"] = true;
                }
                break;
            case "postZipCode":
                const isPostZipCodeValid = RegExp(/^[A-Za-z\d]+$/).test(e.target.value);
                if (e.target.value === "" || e.target.value === null) {
                    errors["postZipCode"] = "Post zip code is required."
                    errors["postZipCodeValid"] = false;
                } else if (!isPostZipCodeValid || (e.target.value.length !== 6)) {
                    errors["postZipCode"] = "Please enter a valid zip code."
                    errors["postZipCodeValid"] = false;
                } else {
                    errors["postZipCode"] = "";
                    errors["postZipCodeValid"] = true;
                }
                break;
            case "postImage":
                if (e.target.files === null || e.target.files[0] === null) {
                    errors["postImage"] = "Image is required."
                    errors["postImageValid"] = false;
                } else {
                    errors["postImage"] = "";
                    errors["postImageValid"] = true;
                }
                break;
            default:
                break;
        }
        setErrors(errors);
    };

    const onChange = (e) => {
        validate(e);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const onImageChange = (e) => {
        validate(e);
        const imageFile = e.target.files[0];
        setFormData({
            ...formData,
            [e.target.name]: imageFile
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFormData()) {
            const userId = 1;
            const travelMemoryFormData = new FormData();
            travelMemoryFormData.append("userId", userId);
            travelMemoryFormData.append("postName", formData.postName);
            travelMemoryFormData.append("postDescription", formData.postDescription);
            travelMemoryFormData.append("postLocation", formData.postLocation);
            travelMemoryFormData.append("postZipCode", formData.postZipCode);
            travelMemoryFormData.append("postImage", formData.postImage);
            createTravelMemoryPost(travelMemoryFormData);
        }
    };

    async function createTravelMemoryPost(travelMemoryFormData) {
        try {
            await postTravelMemoryPost(travelMemoryFormData)
                .then((res) => {
                    const responseExists = (res.data !== null || res.data !== undefined)
                    if (responseExists) {
                        res.data.payload.display = true;
                        setTravelMemoryPosts(travelMemoryPosts => [res.data.payload, ...travelMemoryPosts]);
                        clearFormData();
                    }
                }).catch((err) => {
                    console.log(err)
                    setTravelMemoryPosts(travelMemoryPosts);
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
        <Navigation />
        <Paper className={classes.paper} elevation={6}>
            <form className={`${classes.root} ${classes.form}`} autoComplete="off" noValidate method="POST" enctype="multipart/form-data">
                <Typography variant="h6">Upload Your Memory</Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    id="postName"
                    type="text"
                    name="postName"
                    label="Post Name"
                    variant="outlined"
                    required
                    value={formData.postName}
                    onChange={onChange}
                    error={errors["postName"] ? true : false}
                    helperText={errors["postName"]} />
                <TextField
                    multiline
                    rows={4}
                    fullWidth
                    margin="normal"
                    id="postDescription"
                    type="text"
                    name="postDescription"
                    label="Post Description"
                    variant="outlined"
                    required
                    value={formData.postDescription}
                    onChange={onChange}
                    error={errors["postDescription"] ? true : false}
                    helperText={errors["postDescription"]} />
                <TextField
                    fullWidth
                    margin="normal"
                    id="postLocation"
                    type="text"
                    name="postLocation"
                    label="Post Location"
                    variant="outlined"
                    required
                    value={formData.postLocation}
                    onChange={onChange}
                    error={errors["postLocation"] ? true : false}
                    helperText={errors["postLocation"]} />
                <TextField
                    fullWidth
                    margin="normal"
                    id="postZipCode"
                    type="text"
                    name="postZipCode"
                    label="Post Zip Code"
                    variant="outlined"
                    required
                    value={formData.postZipCode}
                    onChange={onChange}
                    error={errors["postZipCode"] ? true : false}
                    helperText={errors["postZipCode"]} />
                <div className={classes.fileInput}>
                    <input
                        fullWidth
                        id="postImage"
                        type="file"
                        name="postImage"
                        accept="image/*"
                        required
                        onChange={onImageChange}
                        error={errors["postImageValid"] ? true : false}
                        helperText={errors["postImageValid"]} />
                </div>
                <Button
                    className={classes.buttonSubmit}
                    variant="contained"
                    disabled={!validateFormData()}
                    size="large"
                    type="submit"
                    onClick={handleSubmit}
                    fullWidth>Add My Memory</Button>
            </form>
        </Paper>
        </>
    );
}

export default TravelMemoryForm;