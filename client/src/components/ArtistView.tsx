
import { Box, Container, Flex } from '@chakra-ui/layout'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { spotifyArtist } from "../../../server/types/SpotifyTypes"
import { getArtists } from '../API'
import Artist from './Artist'

const ArtistView = () => {
    const [artists, setArtists] = useState<spotifyArtist[]>([])

    useEffect(() => {
        (async () => {
            const resp = await getArtists()
            setArtists(resp)
        })();
    }, []);

    return (
        <Container height="calc( 100vh - 100px )" maxWidth="calc( 100vw - 100px )" paddingTop="80px" >
            <Flex direction="row" gridGap="10px" wrap="wrap" height="calc( 100vh - 100px )" position="absolute">
                {artists.length ? <>{artists.map((a, i) => (<Artist {...a} key={i} />))} </> : <> ei artisteja</>}

            </Flex>
        </Container>
    )
}

export default ArtistView
