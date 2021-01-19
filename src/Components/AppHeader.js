import React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import AddRepo from './AddRepo';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Button } from '@material-ui/core';

const AppHeader = ({ onRepoAdd, onRepoRefresh }) => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" color="inherit" style={{ flex : 1 }}>
                GitHub Release Monitor
            </Typography>

            <Button variant="contained" onClick={onRepoRefresh}>
                <RefreshIcon />
            </Button>

            &nbsp;&nbsp;

            <AddRepo onRepoAdd={onRepoAdd} />
        </Toolbar>
    </AppBar>
);

export default AppHeader;