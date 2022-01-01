/* Dhrumil Amish Shah */
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
    },
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    form: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    fileInput: {
        width: '97%',
        margin: '10px 0',
    },
    buttonSubmit: {
        backgroundColor: '#4267B2',
        color: '#FFFFFF',
        marginBottom: 10,
        '& .Mui-disabled': { backgroundColor: '#E0E0E0' },
        '&:hover': {
            backgroundColor: '#4267B2',
            color: '#FFFFFF',
        },
    }
}));