
import { Box, Flex, Container } from '@chakra-ui/layout'
import { Button, Input, } from '@chakra-ui/react'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link, useHistory, useLocation, useParams, } from 'react-router-dom'
import { spotifyArtist, spotifyAlbum, UserData } from "../../../server/types/SpotifyTypes"
import { AuthContext } from "../hooks/useAuth";

import Album from './Album'

/* interface ArtistPageProps {
    id:string
} */






function useQuery() {
    return new URLSearchParams(useLocation().search);
}


const Login: React.FC = () => {

    const { setAccessToken,
        getAccesStoken } = useContext(
            AuthContext
        );


    // const auth = useAuth();
    let params = useParams();
    let query = useQuery();
    const history = useHistory()
    useEffect(() => {
        if (query.get("accessToken")) {
            console.log(query.get("accessToken"))
            setAccessToken(query.get("accessToken"))
            history.push("/")

        }
    }, [])



    const handleLogin = () => {
        window.location.href = "http://localhost:3000/auth/spotify"
    }


    return (
    
            <Flex justifyContent="center" alignItems="center" height="100vh">
            <Button  boxShadow="dark-lg" p="6" rounded="md" bg="green.400" 
            onClick={() => handleLogin()}>Login with spotify</Button>
        </Flex>
       
    )
}

export default Login
