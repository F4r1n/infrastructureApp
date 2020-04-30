import React from 'react';
import { Grid, TextField, withStyles, Button, CircularProgress, Tooltip, IconButton, Paper } from '@material-ui/core';
import { SentimentDissatisfied, SentimentVeryDissatisfied, SentimentVerySatisfied } from '@material-ui/icons';


import ae from "./images/ae.svg";
import cn from "./images/cn.svg";
import de from "./images/de.svg";
import en from "./images/en.svg";
import es from "./images/es.svg";
import fr from "./images/fr.svg";
import hi from "./images/in.svg";
import it from "./images/it.svg";
import jp from "./images/jp.svg";
import kr from "./images/kr.svg";
import pt from "./images/pt.svg";


const styles = theme => ({
    textfield: {
        width: theme.spacing(150),
        border: "0.01em solid white",
        padding: theme.spacing()
    },
    smalltextfield: {
        width: theme.spacing(60),
        border: "0.01em solid white",
        padding: theme.spacing(),
        margin: theme.spacing(2)
    },
    button: {
        margin: theme.spacing(2)
    },
    icon: {
        margin: theme.spacing(2),
        height: theme.spacing(20),
        width: theme.spacing(20)
    },
    paper: {
        margin: theme.spacing(2)
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: "",
            loading: false,
            result: false,
            flag: null,
            sentiment: "",
            translation: ""
        }
    }

    getResult(result) {
        const classes = this.props.classes
        let resultObj = JSON.parse(result)

        let flag = <div />
        switch (resultObj.sourceLang) {
            case "en":
                flag =
                    <Tooltip title="English">
                        <IconButton>
                            <img className={classes.icon} alt="flag" src={en} />
                        </IconButton>
                    </Tooltip>
                break;
            case "de":
                flag =
                    <Tooltip title="German">
                        <IconButton>
                            <img className={classes.icon} alt="flag" src={de} />
                        </IconButton>
                    </Tooltip>
                break;
            case "fr":
                flag =
                    <Tooltip title="French">
                        <IconButton>
                            <img className={classes.icon} alt="flag" src={fr} />
                        </IconButton>
                    </Tooltip>
                break;
            case "es":
                flag =
                    <Tooltip title="Spanish">
                        <IconButton>
                            <img className={classes.icon} alt="flag" src={es} />
                        </IconButton>
                    </Tooltip>
                break;
            case "it":
                flag =
                    <Tooltip title="Italian">
                        <IconButton>
                            <img className={classes.icon} alt="flag" src={it} />
                        </IconButton>
                    </Tooltip>
                break;
            case "pt":
                flag =
                    <Tooltip title="Portugese">
                        <IconButton>
                            <img className={classes.icon} alt="flag" src={pt} />
                        </IconButton>
                    </Tooltip>
                break;
            case "ar":
                flag =
                    <Tooltip title="Arabic">
                        <IconButton>
                            <img className={classes.icon} alt="flag" src={ae} />
                        </IconButton>
                    </Tooltip>
                break;
            case "hi":
                flag =
                    <Tooltip title="Hindi">
                        <IconButton>
                            <img className={classes.icon} alt="flag" src={hi} />
                        </IconButton>
                    </Tooltip>
                break;
            case "ja":
                flag =
                    <Tooltip title="Japanese">
                        <IconButton>
                            <img className={classes.icon} alt="flag" src={jp} />
                        </IconButton>
                    </Tooltip>
                break;
            case "ko":
                flag =
                    <Tooltip title="Korean">
                        <IconButton>
                            <img className={classes.icon} alt="flag" src={kr} />
                        </IconButton>
                    </Tooltip>
                break;
            case "zh":
            case "zh-TW":
                flag =
                    <Tooltip title="Chinese">
                        <IconButton>
                            <img className={classes.icon} alt="flag" src={cn} />
                        </IconButton>
                    </Tooltip>
                break;
            default:
                break;
        }

        let sentiment = <div />
        switch (resultObj.sentiment.Sentiment) {
            case "NEUTRAL":
                sentiment = <IconButton><SentimentDissatisfied /></IconButton>
                break;
            case "POSITIVE":
                sentiment = <IconButton><SentimentVerySatisfied /></IconButton>
                break;
            case "NEGATIVE":
                sentiment = <IconButton><SentimentVeryDissatisfied /></IconButton>
                break;
            default:
                break;
        }

        let translation = ""
        translation = resultObj.engText.TranslatedText
        this.setState({ result: true, flag: flag, sentiment: sentiment, translation: translation, loading: false })
        this.setState({ loading: false })
    }

    sendCall() {
        if (this.state.text !== "") {
            var request = require('request');
            var options = {
                'method': 'POST',
                'url': 'https://q6ta09z3a4.execute-api.us-east-1.amazonaws.com/prod/comprehend',
                'headers': {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "text": this.state.text })

            };
            request(options, function (error, response) {
                if (error) {
                    console.error(error);
                    this.setState({ loading: false })
                } else {
                    this.getResult(response.body);
                }
            }.bind(this));
        }
    }

    render() {
        const { classes } = this.props
        return (
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center">
                <Grid item>
                    <TextField
                        className={classes.textfield}
                        multiline
                        fullWidth
                        autoFocus
                        rows={5}
                        helperText="Available Languages: English, Spanish, French, German, Italian, Portugese, Japanese, Korean, Arabic, Hindi, Chinese, Chinese (Taiwan)"
                        size="medium"
                        value={this.state.text}
                        onChange={(event) => { this.setState({ text: event.target.value }) }}
                    />
                </Grid>
                <Grid item>
                    {this.state.loading ?
                        <CircularProgress />
                        : <Button onClick={() => { this.setState({ loading: true }); this.sendCall() }} variant="contained" color="primary" className={classes.button}>Absenden</Button>}
                </Grid>
                {this.state.result && <Grid item>
                    <Paper elevation={2} className={classes.paper}>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="center">
                            <Grid item>
                                <TextField
                                    className={classes.smalltextfield}
                                    multiline
                                    fullWidth
                                    rows={5}
                                    label="Translation"
                                    size="medium"
                                    value={this.state.translation}
                                />
                            </Grid>
                            <Grid item>
                                {this.state.flag}
                                {this.state.sentiment}
                            </Grid>
                            <Grid item><Button className={classes.button} onClick={() => { this.setState({ result: false, text: "" }) }} variant="contained" color="primary">Reset</Button></Grid>
                        </Grid>
                    </Paper>
                </Grid>}
            </Grid>
        )
    }
}

export default withStyles(styles)(Home);