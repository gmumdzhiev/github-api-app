// Standart usage
import React, { useEffect, useState } from 'react';
// Importing own components
import SkeletonProfile from '../skeletons/SkeletonProfile';
// Moment library to convert dates
import moment from 'moment';

// Material-UI Library
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';

import Divider from '@material-ui/core/Divider';

import Avatar from '@material-ui/core/Avatar';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { fade, makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase'


// Material-UI Styling called JSS
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        maxWidth: '44ch',
    },
    heading: {
        color: '#fff'
    },
    appBar: {
        borderRadius: 8
    },
    listItem: {
        background: '#282A36',
        borderRadius: 8
    },
    listItemText: {
        color: '#fff',
        wordWrap: 'break-word'
    },
    inline: {
        display: 'inline',
        color: '#fff'
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        }
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '16ch',
            '&:focus': {
                width: '27ch',
            },
        },
    },
}));

// Our Functional component with imported props from parent
const User = (props) => {
    // We need to defined classes so that we can use the JSS statement from above
    const classes = useStyles();


    // Initial state value of the component
    const [profile, setProfile] = useState([]);
    const [filteredData, setFilteredData] = useState(profile)

    // Imported value from props onClick
    const userFromClickedValue = props.clickedValue

    // Our hook call so that we can fetch the latest 20 commits
    // dedicaded to certain repository
    useEffect(() => {
        setTimeout(async () => {

            const owner = userFromClickedValue ? userFromClickedValue.owner.login : "gmumdzhiev"
            const repo = userFromClickedValue ? userFromClickedValue.name : "react-navigation"

            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=20`)
            const data = await response.json();
            setProfile(data);
            setFilteredData(data)
        })
    }, [userFromClickedValue])


    // Filtering the commits with the search input
    const handleSearch = (event) => {
        let value = event.target.value.toLowerCase();
        let result = [];
        result = profile.filter((data) => {
            return data.commit.message.toLowerCase().includes(value) || data.commit.author.name.toLowerCase().includes(value)
        });
        setFilteredData(result);
    }

    // RENDER 
    return (

        <div className='user'>
            <h2 className={classes.heading}>
                Latest Commits from {userFromClickedValue.name}
            </h2>

            <AppBar
                className={classes.appBar}
                position="static">

                <Toolbar>
                    <div className={classes.search}>

                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>

                        <InputBase
                            onChange={(event) => handleSearch(event)}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            {
                // Checking if the filtered data exist and if do 
                // map over the array and spread it to the list item
                filteredData ? filteredData.map((value, i) =>
                    <div key={i} className='profile'>
                        <List className={classes.root}>
                            <ListItem
                                className={classes.listItem}
                                key={i}
                                style={{}}
                                alignItems="flex-start">

                                <ListItemAvatar>
                                    {value.author === null
                                        ? <Avatar alt={value.commit.author.name} />
                                        : <Avatar alt="Avatar" src={value.author.avatar_url} />
                                    }
                                </ListItemAvatar>

                                <ListItemText
                                    className={classes.listItemText}
                                    primary={`Commit message : ${value.commit.message}`}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                            >
                                                <b> {value.commit.author.name} </b>
                                                <br />

                                                Commit - &nbsp;
                                               <Link
                                                    target="_blank"
                                                    href={value.html_url}>
                                                    {`${value.sha.substring(0, 7)}`} &nbsp;
                                                </Link>
                                            - {moment(`${value.commit.author.date}`).format("DD/MM/YYYY")}

                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            
                            <Divider variant="inset" component="li" />

                        </List>

                    </div>
                )
                    :
                    <SkeletonProfile />
                // If there is nothing to render the skeleton will be present
            }
        </div>

    )
}

export default User