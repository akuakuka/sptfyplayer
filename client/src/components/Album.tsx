
import { Box,Flex,Text } from '@chakra-ui/layout'
import { Image, Button, Container } from '@chakra-ui/react'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import { usePlayerDevice, useSpotifyPlayer } from 'react-spotify-web-playback-sdk'
import {spotifyArtist,spotifyAlbum, spotifyTrack} from "../../../server/types/SpotifyTypes"
import { getAlbum, play } from '../API'
import { AuthContext } from '../hooks/useAuth'
import { QueContext } from '../hooks/usePlayQue'


/* interface ArtistPageProps {
    id:string
} */


const getTrackUrisFromAlbum = (tracks:spotifyTrack[]) => {
  return tracks.map(t => (t.uri))
}

const Album:React.FC<spotifyAlbum> = ({name,images,uri,id }) => {
  const player = useSpotifyPlayer();
  const [que, setQue] = useContext(QueContext);
  const device = usePlayerDevice();
  const {getAccesStoken } = useContext(
    AuthContext
  );

  const handlePlay = async () => {
    console.log("album.tsx handleplay")
    console.log(uri)
    const detailedAlbum = await getAlbum(id)
    console.log(detailedAlbum)
    setQue(getTrackUrisFromAlbum(detailedAlbum.tracks.items))
    play(getAccesStoken(),device?.device_id,getTrackUrisFromAlbum(detailedAlbum.tracks.items))
  }

  return (
    <Flex direction="column" backgroundColor="gray.900" 
    alignItems="center" borderRadius="30" width="200px" height="200px" p="3">
    <Image src={images[0].url} boxSize="150px" onClick={() => handlePlay()} cursor="pointer"/>
    <Text>{name}</Text>
    
{/* </Link> */}
   
</Flex>
  )
}

export default Album
