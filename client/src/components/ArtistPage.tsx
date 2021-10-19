
import { Box, Flex, Container } from '@chakra-ui/layout'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { spotifyArtist, spotifyAlbum } from "../../../server/types/SpotifyTypes"
import { getArtist, getArtistAlbums } from '../API'
import Album from './Album'

/* interface ArtistPageProps {
    id:string
} */
const ArtistPage: React.FC = () => {
    const [artist, setArtist] = useState<spotifyArtist>({})
    const [albums, setAlbums] = useState<spotifyAlbum[]>([])
    //@ts-ignore
    let { id } = useParams();
    useEffect(() => {
        (async () => {
            const resp = await getArtist(id)
            setArtist(resp)
            const alabums = await getArtistAlbums(id)
            setAlbums(alabums)
        })();
    }, []);


    useEffect(() => {
        console.log(albums)
    }, [artist]);


    return (
        <Container height="calc( 100vh - 100px )" maxWidth="calc( 100vw - 100px )" paddingTop="100px" >
            <Flex direction="row" gridGap="10px" wrap="wrap">
                {albums.length ? <>{albums.map((a, i) => <Album key={i} {...a} />)} </> : <> ei albumeita</>}
            </Flex>
        </Container>
    )
}

export default ArtistPage
