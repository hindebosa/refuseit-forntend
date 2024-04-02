

import { Helmet } from 'react-helmet-async';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {
  Box,
  styled,
  Divider,
  Drawer,
  IconButton,
  useTheme,
  Typography,
  Button
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';


const RootWrapper = styled(Box)(
  ({ theme }) => `
       height: calc(100vh - ${theme.header.height});
       display: flex;
`
);
function createData(
  name: string,
  amount: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, amount, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


function Products() {

  return (
    <>
      <Helmet>
        <title>Messenger - Applications</title>
      </Helmet>
      <Box sx={{display:'flex',flexDirection:"column",margin:5}}>
      <Box sx={{ display: "flex", justifyContent: "space-around" ,marginBottom:2 }}>
        <Typography sx={{fontSize:23,fontWeight:600,textAlign:"center"}}>All Products</Typography>
        <Button  disableRipple
                  component={RouterLink}
                 
                  to="/addProducts"sx={{color:"#fff",backgroundColor:"#71db41"}}>Add product</Button>
      
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="right">Available</TableCell>
              <TableCell align="right">Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Box>

    </>
  );
}

export default Products;
