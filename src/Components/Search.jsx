import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, IconButton, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function Search({ setSelectedLocation }) {
    const [searchText, setSearchText] = useState('');
    const [suggestedLocations, setSuggestedLocations] = useState([]);

    const handleSearch = (value) => {
        setSearchText(value);
        console.log('Searching for:', value);
    };

    const fetchWeatherForLocation = (location) => {
        const apiKey = '097eeeb342d8477aa69224048240209';
        axios.get(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`)
            .then((res) => {
                setSelectedLocation(location);
                setSearchText(''); 
                setSuggestedLocations([]);
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        if (searchText) {
            const apiKey = '097eeeb342d8477aa69224048240209';
            axios.get(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${searchText}`)
                .then((res) => {
                    setSuggestedLocations(res.data);
                    console.log('Suggestions:', res.data);
                })
                .catch((err) => {
                    console.error(err);
                });
        } else {
            setSuggestedLocations([]);
        }
    }, [searchText]);

    return (
        <div style={{ position: 'relative' }}>
            <Box sx={{ flexGrow: { xs: 0, lg: 1 } }} />
            <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
                <Box
                    sx={{
                        border: '1px solid gray',
                        width: { xs: 340, sm: 500, md: 500, lg: 600 },
                        height: { xs: 40, md: 'auto' },
                        borderRadius: 5,
                        display: 'flex',
                        justifyContent: 'center',
                        ml: 0,
                        position: 'relative',
                        marginTop: 2,
                        zIndex: 50,
                        backgroundColor:'white',

                    }}
                >
                    <IconButton color="black">
                        <SearchIcon />
                    </IconButton>
                    <input 
                        type="text"
                        placeholder="Search for a location..."
                        value={searchText}
                        onInput={(e) => handleSearch(e.target.value)}
                        style={{
                            border: 'none',
                            outline: 'none',
                            width: '100%',
                            padding: '8px',
                            boxSizing: 'border-box',
                            borderRadius: 20,
                            color: 'black',
                        }}
                    />
                </Box>

                {suggestedLocations.length > 0 && (
                    <List
                        sx={{
                            width: { xs: 340, sm: 500, lg: 600 },
                            margin: '0 auto',
                            borderRadius: 2,
                            zIndex: 1,
                            boxShadow: 1,
                            position: 'absolute',
                            color: 'black',
                            top: '100%',
                            backgroundColor:'white',
                            marginTop:1
   

                        }}
                    >
                        {suggestedLocations.map((location, index) => (
                            <ListItem
                                button
                                key={index}
                                onClick={() => fetchWeatherForLocation(location.name)}
                                style={{ color: 'black' }}
                            >
                                <ListItemText primary={location.name} />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Box>

        </div>
    );
}

export default Search;
