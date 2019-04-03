import React from 'react';
import PropTypes, { array } from 'prop-types';
import { withStyles, jssPreset } from '@material-ui/core/styles';
import axios from 'axios';
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import Checkbox from '@material-ui/core/Checkbox';
import _ from 'underscore/underscore';
import { setCallElectionData } from '../../modules/election/state/ElectionAction';
import { connect } from 'react-redux';




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



class CheckboxTableGrid extends React.Component {

    constructor(props) {
        super(props);
        const { CallElectionData } = this.props;

        
        this.state = {
            open: true,
            checkboxGrid: [],
            rowHeaders: [],
            columnHeaders: [],
            rowData: [],
            data: [],
            nominationStart:CallElectionData.nominationStart,
            nominationEnd:CallElectionData.nominationEnd,
            objectionStart:CallElectionData.objectionStart,
            objectionEnd:CallElectionData.objectionEnd,
            depositAmount:CallElectionData.depositAmount,
            WeightagePrefarence:CallElectionData.WeightagePrefarence,
            WeightageVote:CallElectionData.WeightageVote,
            electionName:CallElectionData.electionName,
            electionModule:CallElectionData.electionModule,
        };
    }

    componentWillMount() {

        let rowHeaders = [''];
        this.props.rows.map((value) => {
            rowHeaders.push(value.name);
        });

        let columnHeaders = ['', 'All'];
        this.props.cols.map((value) => {
            columnHeaders.push(value.name);
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
    handleChange = (row, col, data) => (event, value) => {
        const { setCallElectionData,electionData } = this.props;

        let checkboxGrid = Array.from(this.state.checkboxGrid);
        let params = {
            event: event,
            row: row,
            col: col,
            value: value
        }

        if ((col == 0) & (row != 0)) {
            this.setValue('rows', params)
        } else if ((col != 0) && (row == 0)) {
            this.setValue('columns', params)
        } else if ((col == 0) && (row == 0)) {
            this.setValue('all', params);
        } else {
            this.setValue('single', params)
        }

        checkboxGrid[row][col] = event.target.checked;
        this.setState({ checkboxGrid });
        setCallElectionData(this.state);

    };


    setRows = (params) => {
        const { electionData } = this.props;

        let checkboxGrid = Array.from(this.state.checkboxGrid);
        for (let i = 0; i < this.props.cols.length; i++) {
            checkboxGrid[params.row][i + 1] = params.event.target.checked;
            if (params.value) {
                let allow_party = {
                    'division_id': this.props.cols[i].id,
                    'team_id': this.props.rows[params.row - 1].id,
                    'election_id': electionData.election_id,
                    'id': params.row + '-' + (i + 1)
                }
                this.state.rowData.push(allow_party);
            } else {
                this.removeValue(params.row + '-' + (i + 1))
            }

        }
    }

    setColumns = (params) => {
        const { electionData } = this.props;

        let checkboxGrid = Array.from(this.state.checkboxGrid);
        for (let i = 0; i < this.props.rows.length; i++) {
            checkboxGrid[i + 1][params.col] = params.event.target.checked;
            if (params.value) {
                let allow_party = {
                    'division_id': this.props.cols[params.col - 1].id,
                    'team_id': this.props.rows[i].id,
                    'election_id': electionData.election_id,
                    'id': (i + 1) + '-' + params.col
                }
                this.state.rowData.push(allow_party);
            } else {
                this.removeValue((i + 1) + '-' + params.col)
            }
        }
    }


    setValue = (value, params) => {
        const { electionData } = this.props;
        let checkboxGrid = Array.from(this.state.checkboxGrid);
        switch (value) {
            case 'rows':
                this.setRows(params);
                break;

            case 'columns':

                this.setColumns(params);
                break;
            case 'all':

                for (let i = 0; i < this.props.rows.length+1; i++) {
                    checkboxGrid[i][0] = params.event.target.checked;
                    for (let j = 1; j < this.props.cols.length + 1; j++) {
                    checkboxGrid[0][j] = params.event.target.checked;
                        let param = {
                            col: j,
                            row: i,
                            event: params.event,
                            value: params.value
                        }
                        this.setColumns(param)
                    }
                }
                break;
            default:

                if (params.value) {
                    let allow_party = {
                        'division_id': this.props.cols[params.col-1].id,
                        'team_id': this.props.rows[params.row-1].id,
                        'election_id': electionData.election_id,
                        'id': (params.row-1) + '-' + (params.col-1)
                    }
                    this.state.rowData.push(allow_party);
                } else {
                    this.removeValue((params.row-1) + '-' + (params.col-1))
                }

        }

        this.state.rowData = _.uniq(this.state.rowData, function (data) {
            return data.id
        })
    }

    removeValue = (id) => {
        this.state.rowData = _.without(this.state.rowData, _.findWhere(this.state.rowData, {
            id: id
        }));
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


const mapStateToProps = ({ Election }) => {
    const { setCallElectionData  } = Election;
    const CallElectionData  = Election.CallElectionData;
    const electionData = Election.electionData;


    return {  setCallElectionData, CallElectionData,electionData }
  };
  
  const mapActionsToProps = {
    setCallElectionData,
  };
  
  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CheckboxTableGrid));
  