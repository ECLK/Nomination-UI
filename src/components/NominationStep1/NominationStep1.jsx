import React from 'react';
import PropTypes, { array } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import CustomToolbar from "./CustomToolbar";



const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

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
  state = {
      open: true,
      nominations: [],
      candidateCount:'0'

  };
  
  
    componentDidMount() {
      console.log(this)
      axios.get(`nominations/135183e2-a0ca-44a0-9577-0d2b16c3217f/candidates`)
        .then(res => {
          const nominations = res.data;
          const candidateCount = res.data.length;
          localStorage.setItem('candidate',res.data.length)
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
      const { classes } = this.props;
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
      }

    ]

const outputData = rows.map( Object.values );
console.log("output",outputData);

      const data = outputData;
      const options = {
        filterType: "dropdown",
        responsive: "scroll",
        customToolbar: () => {
          return (
            <CustomToolbar />
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

