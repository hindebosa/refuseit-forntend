import { Container, Box, Avatar, Typography, Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as yup from "yup";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { useState } from "react";



const validationSchema = yup.object({
    name: yup
        .string()
        .min(4, "Name should be of minimum 4 characters length")
        .required("Name is required"),
    description: yup
        .string()
        .min(4, "Description should be of minimum 4 characters length")
        .required("Description is required"),
    amount: yup
        .string()
        .min(4, "Amount should be of minimum 4 characters length")
        .required("Amount is required"),
    price: yup
        .string()
        .min(2, "Price should be of minimum 2 characters length")
        .required("Price is required"),
  
});

const AddProduct = () => {
    const [address, setAddress] = useState<string>('');
    const [coordinatess, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);


    const apiUrl = process.env.REACT_APP_API_URL;

    console.log(address)
    const handleSelect = async (value: string) => {

        setAddress(value);
        try {
            const results = await geocodeByAddress(value);
            const latLng = await getLatLng(results[0]);
            setCoordinates(latLng);
        } catch (error) {
            console.error('Error: ', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            amount: "",
            coordinates: {},
            description: "", price: ""
        },
        validationSchema: validationSchema,
        onSubmit: async ({ name,
            amount,
            description, price }) => {

            const result = await axios.post(
                `${apiUrl}/products/createProducts`,
                { amount, coordinates: coordinatess, description, price, name }
            );

            if (result.data.success) {
                await toast.success("Successfully Added a product.", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            await toast.error("Error while trying to install", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })

        },
    });
    return (<Container component="main" maxWidth="xs">
        <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >

            <Typography component="h1" variant="h5">
                Add Product
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}> <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    /></Grid>
                    <Grid item xs={12}>  <TextField
                        fullWidth
                        id="description"
                        name="description"
                        label="Description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    /></Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="amount"
                            name="amount"
                            label="Amount"
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.amount && Boolean(formik.errors.amount)}
                            helperText={formik.touched.amount && formik.errors.amount}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="price"
                            name="price"
                            label="Price"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <PlacesAutocomplete
                            value={address}
                            onChange={setAddress}
                            onSelect={handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <TextField fullWidth
                                        id="phone"
                                        name="phone"
                                        {...getInputProps({ placeholder: "Type address" })} />

                                    <div>
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map((suggestion, index) => {
                                            const style = {
                                                backgroundColor: suggestion.active ? '#41b6e6' : '#fff',
                                            };
                                            return (
                                                <div {...getSuggestionItemProps(suggestion, { style })} key={index}>
                                                    {suggestion.description}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                    </Grid>
                </Grid>
                <Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Add Product
                    </Button>

                </Box>
            </form>
        </Box>
    </Container>);
}

export default AddProduct;