
import { Text,Flex } from '@chakra-ui/layout'
import { Image, Button, Container, Avatar } from '@chakra-ui/react'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import { Link,useParams } from 'react-router-dom'
import { usePlayerDevice, useSpotifyPlayer } from 'react-spotify-web-playback-sdk'
import {spotifyArtist,spotifyAlbum, spotifyTrack} from "../../../server/types/SpotifyTypes"
import { getAlbum, play } from '../API'
import { QueContext } from '../hooks/usePlayQue'

const Artist:React.FC<Partial<spotifyArtist>> = ({images,name,id}) => {
    return (
        <Link to={`/artist/${id}`} key={id}>
            <Flex direction="column" backgroundColor="gray.900" 
            alignItems="center" borderRadius="30" width="180px" height="200px" p="3" boxShadow="dark-lg">
            {images &&  <Avatar src={images ? images[0].url : "https://via.placeholder.com/150"} boxSize="150px" />}
           
            <Text>{name}</Text>
                </Flex>
       
        </Link>
    )
  
}

export default Artist
