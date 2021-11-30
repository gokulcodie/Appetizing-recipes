import * as React from 'react';
import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Skeleton from '@mui/material/Skeleton';
import { Grid } from '@mui/material';

function Media(props) {
  const { loading = false } = props;

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardContent>
        {
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        }
      </CardContent>
      {
        <Skeleton sx={{ height: 190 }} animation="wave" variant="rectangular" />
      }
      <CardHeader
        avatar={
            <Skeleton animation="wave" variant="circular" width={40} height={40} />
        }
        
        title={
        <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
        }
        subheader={
          <Skeleton animation="wave" height={10} width="40%" />
        }
      />
    </Card>
  );
}

Media.propTypes = {
  loading: PropTypes.bool,
};

export default function SkeletonComp() {
  return (
    <Grid container>
  <Grid item xs={6} md={4}>
    <Media loading/>
  </Grid>
  <Grid item xs={6} md={4}>
    <Media loading/>
  </Grid>
  <Grid item xs={6} md={4}>
    <Media loading/>
  </Grid>
  <Grid item xs={6} md={4}>
    <Media loading/>
  </Grid>
    <Grid item xs={6} md={4}>
    <Media loading/>
  </Grid>
  <Grid item xs={6} md={4}>
    <Media loading/>
  </Grid>
  <Grid item xs={6} md={4}>
    <Media loading/>
  </Grid>
  <Grid item xs={6} md={4}>
    <Media loading/>
  </Grid>
    <Grid item xs={6} md={4}>
    <Media loading/>
  </Grid>
  <Grid item xs={6} md={4}>
    <Media loading/>
  </Grid>
  <Grid item xs={6} md={4}>
    <Media loading/>
  </Grid>
  <Grid item xs={6} md={4}>
    <Media loading/>
  </Grid>
</Grid>
  );
}
