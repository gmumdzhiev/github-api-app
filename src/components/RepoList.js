// Standart usage
import React, { useState, useEffect } from 'react';
// Importing own components
import SkeletonArticle from '../skeletons/SkeletonArticle';
// Axios for our API call
import axios from 'axios'

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

import { makeStyles } from '@material-ui/core/styles';

// React Icons Library
import { FaGithub } from "react-icons/fa";


// Material-UI Styling called JSS
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    appBar: {
        borderRadius: 8
    },
    toolbar: {
        padding: theme.spacing(0, 1, 0, 1),
    },
    githubIcon: {
        width: 50,
        height: 50,
        paddingRight: 24
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    listItem: {
        background: '#282A36',
        borderRadius: 8
    },
    listItemText: {
        color: '#fff'
    }
}));

// Our Functional component with imported props from parent
const RepoList = (props) => {

    // We need to defined classes so that we can use the JSS statement from above
    const classes = useStyles();

    // Initial state value of the component
    const [repos, setRepos] = useState(null);

    // Our hook call so that we can fetch all the repositories
    // and set the data to our initial state
    useEffect(() => {
        setTimeout(async () => {
            const response = await axios.get('https://api.github.com/repositories')
            const data = await response.data;
            setRepos(data);
        }, 5000)
    }, [])

    // Managing the click functionality so that we 
    // can return the right data to the parent
    const repoOnclick = (name) => {
        let result = repos.find(obj => {
            return obj.name === name
        })
        props.onClick(result)
    }

    // RENDER 
    return (

        <div className='repositories'>
            <div className={classes.root}>
                <AppBar
                    className={classes.appBar}
                    position="static">

                    <Toolbar className={classes.toolbar}>

                        <FaGithub className={classes.githubIcon} />

                        <Typography
                            className={classes.title}
                            variant="h6"
                            noWrap>
                            List of GitHub public Repositories
                         </Typography>

                    </Toolbar>

                </AppBar>
            </div>
            {
                // Checking if the data exist and if do 
                // map over the array and spread it to the list item
                repos && repos.map((repo, i) => (
                    <div key={i}>
                        <List >
                            <ListItem
                                className={classes.listItem}
                                onClick={() => repoOnclick(repo.name)}
                                key={i} alignItems="flex-start">

                                <ListItemAvatar key={i}>

                                    <Avatar
                                        alt="Remy Sharp"
                                        src={repo.owner.avatar_url} />

                                </ListItemAvatar>

                                <ListItemText
                                    className={classes.listItemText}
                                    key={i}
                                    key={repo.id}
                                    primary={`repository name : ${repo.name}`}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                className={classes.listItemText}
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >

                                                Visability :  <b> {repo.owner.private ? 'Private' : 'Public'} </b> ,
                                                Followers :  {Object.keys(repo.owner.followers_url).length}
                                                <br />Owner : {repo.full_name}
                                                <Link
                                                    target="_blank"
                                                    href={repo.owner.html_url}> &nbsp;
                                                    -  {`${repo.owner.html_url}`}
                                                </Link>

                                            </Typography>
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </List>
                    </div>
                ))
            }
            {!repos && [1, 2, 3, 4, 5, 6, 7].map((n) => <SkeletonArticle key={n} />)}
        </div>
        // If the data is not available yet we are going to load the skeleton
    )
}

export default RepoList