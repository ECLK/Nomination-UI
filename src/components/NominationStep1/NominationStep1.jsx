import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import CustomToolbar from "./CustomToolbar";



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

