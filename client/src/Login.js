import { Box, Button, TextField } from '@mui/material'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <Box style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
    <Box style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',height:'400px',width:'350px',border:'2px solid gray',borderRadius:'5px',marginTop:'65px',padding:'0 10px 0 10px'}}>
            <TextField style={{marginTop:'20px',width:'100%'}} name='username' label='Username' placeholder='username' variant='outlined'/>
            <TextField style={{marginTop:'20px',width:'100%'}} name='password' label='Password' placeholder='password' variant='outlined'/>
            <Button style={{marginTop:'20px',width:'80%'}} variant='contained'>Login</Button>
            <Link to='/signup'
            style={{
              textDecoration: 'none',
              color: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 16,
              fontWeight: 'BOLD',
              marginTop: '20px'
            }}>Don't have an account? Sign Up here</Link>
        </Box>
        </Box>
  )
}

export default Login