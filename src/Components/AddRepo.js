import React, { Fragment } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Octokit } from "@octokit/core";

const octokit = new Octokit();

function AddRepo ({ onRepoAdd }) {
    const [open, setOpen] = React.useState(false);

    const [owner, setOwner] = React.useState('facebook');
    
    const [repo, setRepo] = React.useState('react')

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleOwnerChange = (event) => {
        setOwner(event.target.value);
    };

    const handleRepoChange = (event) => {
        setRepo(event.target.value);
    };
    
    const handleSubmit = () => {
        octokit.request('GET /repos/{owner}/{repo}/releases', {
            owner,
            repo
        }).then(
            (response) => {
                onRepoAdd({
                    owner,
                    repo,
                    version: '', //response.data[0].tag_name
                    new: false
                });
                handleToggle();
                setOwner('');
                setRepo('');
            }
        ).catch(err => alert('Repo not found.'));
    };

    return (
        <Fragment>
            <Button variant="contained" onClick={handleToggle}>
                <AddIcon/>
            </Button>
            <Dialog open={open} onClose={handleToggle}>
                <DialogTitle id="form-dialog-title">Add New Repo</DialogTitle>
                <DialogContentText align='center'>
                    Please enter the repo's owner and name.
                </DialogContentText>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Owner"
                        value={owner}
                        onChange={handleOwnerChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Repo"
                        value={repo}
                        onChange={handleRepoChange}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={handleSubmit}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
}

export default AddRepo;