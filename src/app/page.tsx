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

export default function Home() {

    const Item = styled(Paper)(({theme}) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        flexGrow: 1,
    }));

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

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">

            <Box>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    spacing={3}
                    alignItems="center"
                >
                    <Grid item xs={12}>
                        <Item><input
                            type="text"
                            placeholder="Username"
                            onChange={(event) => setUsername(event.target.value)}
                        /></Item>
                    </Grid>

                    <Grid item xs={12}>
                        <Item><input
                            type="password"
                            placeholder="Password"
                            onChange={(event) => setPassword(event.target.value)}
                        /></Item>
                    </Grid>

                    <Grid item xs={12}>
                        <Item>
                            <button onClick={handleLogin}>Login</button>
                        </Item>
                    </Grid>

                </Grid>
            </Box>


        </main>
    )
}
