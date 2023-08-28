// import './App.css'
import { Box } from '@mui/material'
import { MyLogicLayer, MyLogicLayer2 } from './MyComponent'

function App() {
  return <Box width="100vw" height="100vh" bgcolor={"gray"} padding={4}>
    <MyLogicLayer />
    <MyLogicLayer2 />
  </Box>
}

export default App
