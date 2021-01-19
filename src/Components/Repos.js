import React from 'react';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemSecondaryAction } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

function Repos({ repos, onRepoDelete, onRepoSeen }) {
    return (
        <Container>
            <List>
                {repos.map(item => (
                    <ListItem button onClick={() => onRepoSeen(item)}>
                        <ListItemText 
                            primary={`${item.owner}/${item.repo}`} 
                            secondary = {item.version}
                        />

                        <listItemIcon style={{visibility: item.new ? 'visible' : 'hidden'}} >
                            <NewReleasesIcon />
                        </listItemIcon>

                        &nbsp;&nbsp;&nbsp;&nbsp;

                        <ListItemSecondaryAction>
                            <IconButton onClick={() => onRepoDelete(item)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Container>  
    );
}

export default Repos;