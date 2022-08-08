import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { styled , makeStyles  } from '@mui/styles';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import { Divider, Grid } from '@mui/material';
import { Box } from '@mui/system';

const Titre = styled(Typography)(({ theme }) => ({
    fontSize: 18 ,
    

}));


const useStyles = makeStyles(() => ({
    wrapIcon: {
        alignItems: "center",
        display: "flex",
        
    } 
  }))



 
  


const Cards = () => {

  const classes = useStyles();
  return (
    <Card elevation={0}  sx={{ height: 150 }} >

      
    
    <CardContent>
    <Grid container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item >
        
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            Training data 
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
            
          >
            2500,00
          </Typography>

          </Grid>
        <Grid item>
        <Avatar
            sx={{
              backgroundColor: '#1F4690',
              height: 50,
              width: 50
            }}
          >
            
            <StorageRoundedIcon />
          </Avatar>
        
        </Grid>
        </Grid>
        <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowUpwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1,
            ml:0.5,
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
          ml={2}
        >
          Less than last month
        </Typography>
      </Box>


    </CardContent>
 
  </Card>
  )
}

export default Cards