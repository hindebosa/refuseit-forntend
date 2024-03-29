import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from 'src/contexts/AuthContext';

function PageHeader() {
  const {user}=useAuth()
  // const user = {
  //   name: 'Catherine Pike',
  //   avatar: 
  // };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src='/static/images/avatars/1.jpg'
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {user.name}!
        </Typography>
        <Typography variant="subtitle2">
          Today is a good day to start sell refuse
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
