import Navbar from './Navbar'
import { Box} from '@mui/material'
import TextEditor from './TextEditor'

const Home = () => {
  return (
        <Box sx={{height:'100vh',width:'100vw',display:'flex',flexDirection:'column',}}>
        <Box sx={{height:{xs:'9.78%',sm:'9.78%',md:'9.65%'},width:'100%',backgroundColor:'',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Navbar/>
        </Box>
        <Box sx={{height:'100%',width:'100%',overflow:'auto'}}>
          <TextEditor/>
        </Box>
        </Box>
  )
}

export default Home