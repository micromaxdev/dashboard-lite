import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';


            // <ImagesFour classes={classes} imageLinks={[
            //     "",
            //     "",
            //     "",
            //     ""]} />

const ImagesFour = ({ classes, imageLinks }) => { 

    return (
        <Grid item xs={12} md={6} className={classes.imagesColumn}>

            <Grid container spacing={2}>

                <Grid item xs={12} md={8}>
                    <Box display="flex" height="100%">
                        <Card className={classes.maxHW}>
                            <CardMedia className={classes.mediaLarge} image={imageLinks[0]} />
                        </Card>
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} className={classes.emptyCardContainer}>
                            <Card className={classes.emptyCard}>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <Card>
                                <CardMedia className={classes.media} image={imageLinks[1]} />
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>

            <Grid container spacing={2}>

                <Grid item xs={12} md={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card>
                                <CardMedia className={classes.media} image={imageLinks[2]} />
                            </Card>
                        </Grid>
                        <Grid item xs={12} className={classes.emptyCardContainer}>
                            <Card className={classes.emptyCard}>
                            </Card>
                        </Grid>
                    </Grid>
                </Grid>
                
                <Grid item xs={12} md={8}>
                    <Box display="flex" height="100%">
                        <Card className={classes.maxHW}>
                            <CardMedia className={classes.mediaLarge} image={imageLinks[3]} />
                        </Card>
                    </Box>
                </Grid>

            </Grid>

        </Grid>
    );
}

export default ImagesFour
