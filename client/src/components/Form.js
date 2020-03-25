import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';

// @material-ui
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { addPhraseAction } from "../actions";

class Form extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            phrase: ''
        }
    }

    createProcess = async () => {
        await axios.post("http://localhost:3000/process", {
            phrase: this.state.phrase
        }).then(response => {
            if (response.status === 200 && response.data && response.data.encryptedPhrase) {
                this.props.addPhraseAction(response.data.encryptedPhrase);
            }
        }).catch(error => console.error(error));
        this.setState({
            phrase: ''
        });
    }

    resetList = async () => {
        await axios.delete("http://localhost:3000/process").catch(error => console.error(error));
        window.location.reload();
    }

    correctText = async () => {
        await axios.put("http://localhost:3000/nlp", {
            text: this.state.phrase
        }).then(response => {
            if (response.status === 200 && response.data && response.data.correctedText) {
                this.setState({ phrase: response.data.correctedText });
            }
        }).catch(error => console.error(error));
    }

    onChange = event => {
        event.preventDefault();
        const { value } = event.target;

        this.setState({ phrase: value });
    }

    render() {
        return (
            <div id="form-container">
                <Grid container>
                    <Grid item xs={3} alignItems={"flex-start"} justify={"flex-start"}>
                        <TextField
                            id='phrase'
                            label='Phrase'
                            placeholder='phrase'
                            fullWidth
                            value={this.state.phrase}
                            onChange={this.onChange}
                            required>
                        </TextField>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            variant="contained"
                            color="secondary"
                            disabled={!this.state.phrase}
                            onClick={this.createProcess}
                        >
                            Encrypt
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={!this.state.phrase}
                            onClick={this.correctText}
                        >
                            Correct text
                        </Button>
                    </Grid>
                    <Grid item xs={1}>
                        <Button
                            variant="contained"
                            onClick={this.resetList}
                        >
                            Reset list
                        </Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapDispatchToProps = {
    addPhraseAction
};

export default connect(null, mapDispatchToProps)(Form);
