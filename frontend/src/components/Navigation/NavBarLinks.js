import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link as MuiLink } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    iconWrapper: {
        minWidth: 40,
    },
}));

const NavBarLinks = ( {content, length} ) => {

    const classes = useStyles()

    return (

            <>
                <ListItem button component={MuiLink} to={content.route[length]} key={length} className="navBarListItem">
                    <ListItemIcon className={classes.iconWrapper}>
                        {content.icon[length]}
                    </ListItemIcon>
                    <ListItemText primary={content.name[length]} />
                </ListItem>
            </>


    )
}

export default NavBarLinks