import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  hash: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  name: yup
    .string()
    .min(4, "Name should be of minimum 4 characters length")
    .required("Password is required"),
  phone: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  surname: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const SignUp = () => {
  const formik = useFormik({
    initialValues: {
      email: "",
      hash: "",
      surname: "",
      phone: "",
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async ({ email, phone, hash, surname, name }) => {
      const result = await axios.post(
        `${apiUrl}/auth/email/register`,
        { email, phone, hash, surname, name }
      );
  
     if(result.data.success){
      await toast.success("Successfully Added User.Please view email",{position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
     });
     }
     await toast.error("Error while trying to install",{ position: "top-right",
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

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                id="name"
                name="name"
                label="First Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="lastName"
                name="surname"
                label="Last Name"
                value={formik.values.surname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.surname && Boolean(formik.errors.surname)}
                helperText={formik.touched.surname && formik.errors.surname}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="phone"
                name="phone"
                label="Phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="password"
                name="hash"
                label="Password"
                type="password"
                value={formik.values.hash}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.hash && Boolean(formik.errors.hash)}
                helperText={formik.touched.hash && formik.errors.hash}
              />
            </Grid>
          </Grid>
          <Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Container>
  );
};
export default SignUp;
