import React, { Fragment, useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import AppHeader from './Components/AppHeader';
import Repos from './Components/Repos'
import './App.css';
import { Octokit } from "@octokit/core";

const ALL_REPOS = localStorage.getItem('repos') 
    ? JSON.parse(localStorage.getItem('repos')) 
    : [];

function App () {
    const [repos, setRepos] = useState(ALL_REPOS);

    useEffect(() => {
        localStorage.setItem('repos', JSON.stringify(repos))
    }, [repos]);

    const handleRepoAdd = repo => {
        setRepos([
            ...repos,
            repo
        ]);
    };
    
    const handleRepoDelete = repo => {
        setRepos(
            repos.filter(item => 
                item !== repo
            )
        );
    };

    const octokit = new Octokit();

    const handleRepoRefresh = async () => {
        for (let i = 0; i < repos.length; i++) {
            try {
                let response = await octokit.request('GET /repos/{owner}/{repo}/releases', {
                    owner: repos[i].owner,
                    repo: repos[i].repo
                });
                let version = response.data[0].tag_name
                if (repos[i].version !== version) {
                    let reposCopy = [...repos];
                    reposCopy[i] = { ...repos[i], version, new: true }
                    setRepos(reposCopy);
                }
            } catch (err) {
                console.log(err)
            }
        }
    };

    const handleRepoSeen = repo => {
        let reposCopy = [... repos];
        let repoIndex = repos.findIndex(item => item === repo);
        reposCopy[repoIndex] = { ...repos[repoIndex], new: false } 
        setRepos(reposCopy);
    };

    return (
        <Fragment>
            <CssBaseline />
            <AppHeader 
                onRepoAdd={handleRepoAdd} 
                onRepoRefresh={handleRepoRefresh} 
            />
            <Repos 
                repos={repos} 
                onRepoDelete={handleRepoDelete} 
                onRepoSeen={handleRepoSeen}
            />
        </Fragment>
    );
}

export default App;