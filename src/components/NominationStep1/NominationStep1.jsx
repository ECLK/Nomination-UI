import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import CustomToolbar from "./CustomToolbar";
import Button from '@material-ui/core/Button';
import Switch from "@material-ui/core/Switch";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PropTypes from "prop-types";
import AddIcon from '@material-ui/icons/Add';










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

    static propTypes = {
        value: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired,
        change: PropTypes.func.isRequired
      };

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            nominations: [],
            candidateCount: '0',
        }

    }

    componentDidMount() {
        const { customProps } = this.props;

        axios.get(`nominations/${customProps}/candidates`)
            .then(res => {
                const nominations = res.data;
                const candidateCount = res.data.length;
                localStorage.setItem('candidate', res.data.length)
                this.setState({ nominations });
                this.setState({ candidateCount });
            })
    }



    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const rows = this.state.nominations;


        const columns = [
            {
                name: "ID",
                options: {
                    display: false
                }
            },
            {
                name: "NIC",
                options: {
                    display: true
                }
            },
            {
                name: "Full Name",
                options: {
                    display: true
                }
            },
            {
                name: "Preferred Name",
                options: {
                    display: true
                }
            },
            {
                name: "Date of Birth",
                options: {
                    display: true
                }
            },
            {
                name: "Gender",
                options: {
                    display: true
                }
            },
            {
                name: "Occupation",
                options: {
                    display: true
                }
            },
            {
                name: "Address",
                options: {
                    display: true
                }
            },
            {
                name: "Electoral Division",
                options: {
                    display: true
                }
            },
            {
                name: "Electoral Division Code",
                options: {
                    display: true
                }
            },
            {
                name: "Action",
                options: {
                  filter: true,
                  customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <CustomToolbar
                value={value}
                index={tableMeta.rowData[0]}
                change={event => updateValue(event)}
                customProps={customProps}
                modalType="Update"

              />
                         
                    );
                  },         
                }
            },
           
           

        ]
        // rows = rows.concat('true');

        const outputData = rows.map(Object.values);

        console.log("output", outputData);
        const { customProps } = this.props;

        const data = outputData;
        const options = {
            filterType: "dropdown",
            responsive: "scroll",
            customToolbar: () => {
                return (
                    <CustomToolbar customProps={customProps} modalType="Add" />
                );
            }
        };

        return (
            <MUIDataTable
                title={"Nomination Candidate list"}
                data={data}
                columns={columns}
                options={options}
            />
        );
    }
}


export default withStyles(styles)(CustomizedTable);

