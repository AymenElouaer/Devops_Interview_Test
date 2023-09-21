import { makeStyles } from "@material-ui/core"; 1

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center items horizontally
        padding: theme.spacing(2),

        backgroundColor: theme.palette.background.default,
    },
    input: {
        marginBottom: theme.spacing(2),
        width: '40%',
    },
    select: {
        marginBottom: theme.spacing(2),
        width: '50%',
    },
    submitButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(1, 2),
        borderRadius: theme.shape.borderRadius,
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
    },
}));
export default useStyles;