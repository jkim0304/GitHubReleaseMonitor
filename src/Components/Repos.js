import React, { Fragment } from 'react';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ListItemSecondaryAction } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import ReactMarkdown from 'react-markdown'

function Repos({ repos, onRepoDelete, onRepoSeen }) {
    const [open, setOpen] = React.useState(false);

    const [detailItem, setDetailItem] = React.useState({});

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleRepoPress = (item) => {
        setDetailItem(item);
        handleToggle();
        onRepoSeen(item);
    };

    return (
        <Fragment>
            <Dialog open={open} onClose={handleToggle}>
                <DialogTitle>Release Notes</DialogTitle>
                <DialogContent>
                    <ReactMarkdown source={detailItem.body} />
                    <DialogContentText align='center'>
                        <a 
                            href={`http://github.com/${detailItem.owner}/${detailItem.repo}/releases`}
                            target="_blank" 
                            rel="noreferrer"
                        >
                            Releases Page
                        </a>
                    </DialogContentText>
                </DialogContent>
            </Dialog>

            <Container>
                <List>
                    {repos.map(item => (
                        <ListItem button onClick={() => handleRepoPress(item)}>
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
        </Fragment>
    );
}

export default Repos;