'use client'
import {useEffect, useState} from "react";
import axios from 'axios';
import * as React from 'react';
import {IconButton, Grid} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useRouter} from "next/navigation";
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from '@mui/x-date-pickers';
import dayjs, {Dayjs} from 'dayjs';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";


export default function Page() {

    const startDate = dayjs();
    const endDate = dayjs().add(1, 'day');

    const [institutionData, setInstitutionData] = useState([]);
    const [selectedInstitution, setSelectedInstitution] = useState('');
    const [selectedStartDate, setSelectedStartDate] = useState<Dayjs | null>(startDate);
    const [selectedEndDate, setSelectedEndDate] = useState<Dayjs | null>(endDate);
    const [balance, setBalance] = useState(0.00);


    const router = useRouter();
    const API_BACKEND = 'https://test-aguila-c8d18d1be9eb.herokuapp.com/';

    useEffect(() => {
        //Check for logged in
        const tokenString = Boolean(sessionStorage.getItem('isLoggedIn'));
        if (!tokenString) {
            router.push('/');
        }
        // Fetch data from the API
        axios.get(API_BACKEND + "institutions").then((response) => {
            if (response.status === 200) {
                setInstitutionData(response.data);
            } else {
                setInstitutionData([]);
            }

        });
    }, []);


    const handleSelectedInstitution = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        setSelectedInstitution(event.target.value)
    }

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        signDisplay: 'always'
    });

    const handleSearchDetails = () => {
        console.log("Fecha Inicio: {}", selectedStartDate?.format('YYYY-MM-DD'));
        console.log("Fecha Fin: {}", selectedEndDate?.format('YYYY-MM-DD'));

        let balanceRequest = {
            id: selectedInstitution,
            dateForm: selectedStartDate?.format('YYYY-MM-DD'),
            dateTo: selectedEndDate?.format('YYYY-MM-DD'),
        }

        // Fetch data from the API
        axios.post(API_BACKEND + "balance", balanceRequest).then((response) => {
            if (response.status === 200) {
                setBalance(response.data.balance);
            } else {
                setBalance(0.00);
            }

        });
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <main className="min-h-screen flex-col p-24">

                <Box>
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        spacing={3}
                        alignItems="center"
                    >
                        <Grid item xs={12}>
                            <FormControl sx={{m: 1, minWidth: 120}}>
                                <InputLabel id="demo-simple-select-label">Institutions</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Age"
                                    onChange={handleSelectedInstitution}
                                    value={selectedInstitution}
                                >
                                    {
                                        institutionData.map((data: Institution) => {
                                            return <MenuItem key={data.id}
                                                             value={data.id}>{data.displayName}</MenuItem>;
                                        })}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs>
                            <DatePicker label="Fecha de Inicio" value={selectedStartDate}
                                        onChange={(newValue) => setSelectedStartDate(newValue)}/>
                        </Grid>

                        <Grid item xs>
                            <DatePicker label="Fecha de Fin" value={selectedEndDate} minDate={selectedStartDate}
                                        onChange={(newValue) => setSelectedEndDate(newValue)}/>
                        </Grid>

                        <Grid item xs>
                            <IconButton
                                aria-label="edit"
                                color="primary"
                                onClick={handleSearchDetails}
                            >
                                <SearchIcon fontSize="large"/>
                            </IconButton>
                        </Grid>

                        <Grid item xs>
                            <Typography variant="h3"
                                        color={balance < 0.0 ? 'error.main' : 'success.main'}
                            >
                                Balance: {balance? USDollar.format(balance) : 0.00}
                            </Typography>
                        </Grid>


                    </Grid>
                </Box>

            </main>

        </LocalizationProvider>
    )
        ;
}