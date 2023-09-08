'use client'
import axios from 'axios';
import {useState} from "react";
import {useRouter} from "next/navigation";
import Stack from '@mui/material/Stack';
import {styled} from '@mui/material/styles';
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {Button, TextField} from "@mui/material";

export default function Home() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const API_BACKEND = 'https://test-aguila-c8d18d1be9eb.herokuapp.com/';
    const handleLogin = () => {
        axios.post(API_BACKEND + 'login', {
            username,
            password,
        })
            .then((response) => {
                if (response.status === 200) {
                    sessionStorage.setItem('isLoggedIn', 'true');
                    // Redirect to the home page
                    router.push('/dashboard');

                } else {
                    // Show an error message
                    alert('Invalid username or password');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    return (
        <main className="flex flex-col p-24">

            <Box component="form">
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    spacing={3}
                    alignItems="center"
                >
                    <TextField fullWidth
                               type="text"
                               id="username"
                               name="username"
                               required={true}
                               placeholder="Username"
                               onChange={handleUsernameChange}
                    />

                    <TextField fullWidth
                               type="password"
                               id="password"
                               required={true}
                               name="password"
                               placeholder="Password"
                               onChange={handlePasswordChange}
                    />
                    <Button variant="contained" color="primary" onClick={handleLogin}>Login</Button>
                </Grid>
            </Box>


        </main>
    )
}