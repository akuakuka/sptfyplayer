import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { QueProvider } from './hooks/usePlayQue'
import "@fontsource/aldrich"
import '@fontsource/lemon'


const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    heading: 'Lemon',
    body: 'Lemon',
},
}
const theme = extendTheme({ config })


ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
     
      <QueProvider>

<App />

</QueProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)


