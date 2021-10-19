
import { Box,Flex } from '@chakra-ui/layout'
import { Button, Container } from '@chakra-ui/react'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import { usePlayerDevice } from 'react-spotify-web-playback-sdk'
import {spotifyArtist,spotifyAlbum} from "../../../server/types/SpotifyTypes"
import { getAlbum } from '../API'
import { QueContext } from '../hooks/usePlayQue'

/* interface ArtistPageProps {
    id:string
} */



const AlbumPage:React.FC = () => {
    //const device = usePlayerDevice();
    const [album, setAlbum] = useState<spotifyAlbum>({})
    //@ts-ignore
    let { id } = useParams();


    const [que, setQue] = useContext(QueContext);


    
useEffect(() => {
    (async () => {
        const resp = await getAlbum(id)
        console.log(resp)
        setAlbum(resp)


    })();
}, []);


useEffect(() => {
    console.log(album)
}, [album]);


  return (
    <Container height="calc( 100vh - 100px )" width="calc( 100vw - 100px )">
   <Flex direction="row" gridGap="10px" wrap="wrap">
    {album.name}
    {album.tracks && <>{album.tracks.items.map(t => <Box key={t.id}>{t.name} <Button onClick={() => setQue([t.uri])}>play</Button> </Box>)}</> }
</Flex>
</Container>
  )
}

export default AlbumPage
