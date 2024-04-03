

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
  Typography,
  Button
} from '@mui/material';
import { NavLink as RouterLink } from 'react-router-dom';
import { Product } from 'src/utils/types';
import { useApp } from 'src/contexts/AppContext';

function createData(
  name: string,
  amount: string,
  description: string,
  price: string,

) {
  return { name, description,amount, price };
}



function Products() {
   const [rows,setRows]= React.useState<{  name: string,
    amount: string,
    description: string,
    price: string,}[]>([])

  const { getProducts } = useApp();

  const getAllproducts = async () => {
    const result = await getProducts()
    const wee= result.map(res=>{
     return createData(res.name, res.amount, res.description,res.price)
    })
 setRows(wee)
  }

  React.useEffect(() => {

    getAllproducts()

  }, [])


  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Box sx={{ display: 'flex', flexDirection: "column", margin: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-around", marginBottom: 2 }}>
          <Typography sx={{ fontSize: 23, fontWeight: 600, textAlign: "center" }}>All Products</Typography>
          <Button disableRipple
            component={RouterLink}

            to="/addProducts" sx={{ color: "#fff", backgroundColor: "#71db41" }}>Add product</Button>

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
                  <TableCell align="right">{row.description}</TableCell>
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
