import React from "react";
import axios from 'axios';
import { connect } from 'react-redux';

// @material-ui
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class List extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            list: []
        }
    }

    componentDidMount() {
        this.getList();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.phrase !== this.props.phrase) {
          //reset states

          this.setState(state => {
            const list = state.list.concat(newProps.phrase);
            return {
              list
            };
          });
        }
      }

    getList = async () => {
        await axios.get("http://localhost:3000/history")
        .then(response => {
            if (response.status === 200 && response.data) {
                this.setState({ list: response.data });
            }
        });
    }

    render() {
        return (
            <div id="list-container">
                <TableContainer component={Paper}>
                    <Table stickyHeade aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: '20%' }}>#Message</TableCell>
                                <TableCell >Encrypted message</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.list.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{item}</TableCell>
                            </TableRow>
                        ))}
                        {this.state.list.length === 0 ? (
                            <p>No results found</p>
                        ) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
}
  
const mapStateToProps = states => {
    return {
        phrase: states.phrase
    }
};

export default connect(mapStateToProps)(List);
