import React from 'react';
import PropTypes, { array } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import Checkbox from '@material-ui/core/Checkbox';



const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});



class CustomizedTable extends React.Component {
    
    constructor(props){
        super(props);

        this.state = {
            open: true,
            checkboxGrid: [[]],
        };

        

    }


    handleChange = (row, col) => event => {
        let checkboxGrid = this.state.checkboxGrid.slice();
        checkboxGrid[row][col] = event.target.checked;
        this.setState({ checkboxGrid });
        console.log(checkboxGrid);
    };


    render() {
        const { classes } = this.props;
        console.log('---->'+this.props.columnHeaders);

        let rowData = [
            {
                party: "",
                division1: <Checkbox color="primary" checked={this.state.checkboxGrid[0][0]} onChange={this.handleChange(0,0)}></Checkbox>,
                division2: <Checkbox color="primary" checked={this.state.checkboxGrid[0][1]} onChange={this.handleChange(0,1)}></Checkbox>,
                division3: <Checkbox color="primary" checked={this.state.checkboxGrid[0][2]} onChange={this.handleChange(0,2)}></Checkbox>,
                division4: <Checkbox color="primary" checked={this.state.checkboxGrid[0][3]} onChange={this.handleChange(0,3)}></Checkbox>,
                division5: <Checkbox color="primary" checked={this.state.checkboxGrid[0][4]} onChange={this.handleChange(0,4)}></Checkbox>,
            },
            {
                party: 'Registered Political Party-2',
                division1: <Checkbox color="primary"></Checkbox>,
                division2: <Checkbox color="primary"></Checkbox>,
                division3: <Checkbox color="primary"></Checkbox>,
                division4: <Checkbox color="primary"></Checkbox>,
                division5: <Checkbox color="primary"></Checkbox>,
            },
            {
                party: 'Independent Group-1',
                division1: <Checkbox color="primary"></Checkbox>,
                division2: <Checkbox color="primary"></Checkbox>,
                division3: <Checkbox color="primary"></Checkbox>,
                division4: <Checkbox color="primary"></Checkbox>,
                division5: <Checkbox color="primary"></Checkbox>,
            },
            {
                party: 'Independent Group-1',
                division1: <Checkbox color="primary"></Checkbox>,
                division2: <Checkbox color="primary"></Checkbox>,
                division3: <Checkbox color="primary"></Checkbox>,
                division4: <Checkbox color="primary"></Checkbox>,
                division5: <Checkbox color="primary"></Checkbox>,
            }
        ]

        const outputData = rowData.map(Object.values);


        // set column data
        const columns = this.props.columnHeaders;

        // set option list
        const options = {
            filterType: "dropdown",
            responsive: "scroll",
            selectableRows: false,
        };

        return (
            <MUIDataTable
                title={"Nomination Candidate list"}
                data={outputData}
                columns={columns}
                options={options}
            />
        );
    }
}


export default withStyles(styles)(CustomizedTable);

