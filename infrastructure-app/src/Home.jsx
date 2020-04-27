import React from 'react';
import { Grid, TextField } from '@material-ui/core';

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <Grid sm={8}>
                <TextField
                    multiline
                    fullWidth
                />
            </Grid>
        )
    }
}

export default Home;