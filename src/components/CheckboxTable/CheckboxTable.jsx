import React from 'react';
import PropTypes, { array } from 'prop-types';
import { withStyles, jssPreset } from '@material-ui/core/styles';
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
            checkboxGrid: [],
            rowHeaders: [],
            columnHeaders: [],
            rowData: [],
        };
    }

    componentWillMount() {

        let rowHeaders = [''];
        this.props.rows.map((value) => {
            rowHeaders.push(value);
        });

        let columnHeaders = ['', ''];
        this.props.cols.map((value) => {
            columnHeaders.push(value);
        });

        let checkboxGrid = [];
        rowHeaders.map(() => {
            let row = [];
            columnHeaders.map(() => {
                row.push(false);
            });
            checkboxGrid.push(row);
        });

        this.setState({ rowHeaders, columnHeaders, checkboxGrid });

    }


    // this will handle the change of checkbox and update the state.checkboxGrid variable, which is the source to the grid.
    handleChange = (row, col, data) => event => {
        let checkboxGrid = Array.from(this.state.checkboxGrid);
        console.log(row + ' ' + col);

        if (col == 0) {
            this.setValue('rows',event,row,col)
        } else if (row == 0) {
            this.setValue('columns',event,row,col)
        }
        //TODO:: implement on all select

        let allow_party = {
            'division_id': this.state.columnHeaders[col + 1],
            'team_id': this.state.rowHeaders[row],
        }

        console.log(this.state.rowHeaders[row])
        console.log(this.state.columnHeaders[col + 1])

        checkboxGrid[row][col] = event.target.checked;
        this.setState({ checkboxGrid });

        console.log(this.state.rowData);
    };


    setValue = (value,event,row,col) => {
        let checkboxGrid = Array.from(this.state.checkboxGrid);
        switch (value) {
            case 'rows':
                for (let i = 0; i < this.state.columnHeaders.length; i++) {
                    checkboxGrid[row][i] = event.target.checked;
                    let allow_party = {
                        'division_id': this.state.columnHeaders[i],
                        'team_id': this.state.rowHeaders[row],
                    }
                }
                break;

            case 'columns':
                for (let i = 0; i < this.state.rowHeaders.length; i++) {
                    checkboxGrid[i][col] = event.target.checked;
                    let allow_party = {
                        'division_id': this.state.columnHeaders[col],
                        'team_id': this.state.rowHeaders[i],
                    }
                }
                break;
        }

    }


    render() {
        const { data } = this.props;

        // this is written here so that `checked={this.state.checkboxGrid[i][j-1]}` could work.
        // on this way updated checkbox data is always taken from state and setup properly
        let rowData = [];
        for (let i = 0; i < this.state.rowHeaders.length; i++) {
            let colData = [];
            for (let j = 0; j < this.state.columnHeaders.length; j++) {
                if (j == 0) {
                    colData.push(this.state.rowHeaders[i]);
                } else {
                    colData.push(<Checkbox color="primary" checked={this.state.checkboxGrid[i][j - 1]} onChange={this.handleChange(i, j - 1, data)}></Checkbox>);
                }
            }
            rowData.push(colData);
        }

        // set row data headers
        const outputData = rowData.map(Object.values);

        // set column data
        const columns = this.state.columnHeaders;

        // set option list
        const options = {
            filterType: "dropdown",
            responsive: "scroll",
            selectableRows: false,
        };

        return (
            <MUIDataTable
                title={this.props.title}
                data={outputData}
                columns={columns}
                options={options}
            />
        );
    }
}


export default withStyles(styles)(CheckboxTableGrid);

