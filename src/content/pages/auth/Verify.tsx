import { Box, Button } from "@mui/material";
import axios from "axios";
import { useCallback } from "react";
import { useParams ,useNavigate} from 'react-router-dom';
import { toast } from "react-toastify";



const Verify = () => {
    const {token} = useParams()
const navigate = useNavigate()

  const handleClick = useCallback( async () => {
     const result = await axios.get(`http://localhost:3010/auth/email/verify/${token}`)
     console.log(result.data)
    
     if(result.data.success){
     toast.success("Your account has been veified")
      navigate("/auth/login");
     }
     if(!(result.data.status===403)){
       toast.error("LOGIN EMAIL CODE NOT VALID")
     }
  },[token])

  return (
    <Box>
      <Button onClick={handleClick}>Verify</Button>
    </Box>
  );
};

export default Verify;
