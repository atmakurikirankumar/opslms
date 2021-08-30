import { getTeamLeaves, getTeamLeavesGroupByMonth } from "../actions/leavesActions";
import { getTeamById } from "../actions/teamsActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import React, { useEffect } from "react";
import { Row, Button } from "react-bootstrap";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import moment from "moment";
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const TeamAbsence = ({ history }) => {
  const dispatch = useDispatch();

  const { loading, error, leaves } = useSelector((state) => state.getTeamLeavesReducer);
  const { groupByMonthLeavesLoading, groupByMonthLeavesError, groupByMonthLeaves } = useSelector(
    (state) => state.getTeamLeavesGroupByMonth
  );

  const { userInfo } = useSelector((state) => state.userLogin);

  const { team } = useSelector((state) => state.getTeamByIdReducer);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(getTeamLeaves());
    dispatch(getTeamLeavesGroupByMonth());
    dispatch(getTeamById(userInfo.team));
  }, [dispatch, history, userInfo]);

  const calculateNumberOfDays = (sdate, edate) => {
    let start = moment(sdate);
    let end = moment(edate);
    let weekdayCounter = 0;
    while (start <= end) {
      if (start.format("ddd") !== "Sat" && start.format("ddd") !== "Sun") {
        weekdayCounter++;
      }
      start = moment(start).add(1, "days");
    }
    return weekdayCounter;
  };

  const format = (str) => {
    return str.substring(0, 10);
  };

  const MyExportCSV = (props) => {
    const handleClick = () => {
      props.onExport();
    };
    return (
      <div>
        <Button variant="primary" onClick={handleClick}>
          Export to CSV
        </Button>
      </div>
    );
  };

  const columns = [
    {
      dataField: "_id",
      text: "Leave Id",
      formatter: (cellContent, row) => {
        return format(cellContent);
      },
      csvText: "Leave Id",
    },
    {
      dataField: "user.firstname",
      text: "First Name",
      sort: true,
      csvText: "First Name",
    },
    {
      dataField: "user.lastname",
      text: "Last Name",
      sort: true,
      csvText: "Last Name",
    },
    {
      dataField: "user.username",
      text: "User Name",
      sort: true,
      csvText: "User Name",
    },
    {
      dataField: "startdate",
      text: "Start Date",
      formatter: (cellContent, row) => {
        return format(cellContent);
      },
      csvText: "Leave Start Date",
      csvFormatter: (cell, row, rowIndex) => {
        return format(cell);
      },
      sort: true,
    },
    {
      dataField: "enddate",
      text: "End Date",
      formatter: (cellContent, row) => {
        return format(cellContent);
      },
      csvText: " Leave End Date",
      csvFormatter: (cell, row, rowIndex) => {
        return format(cell);
      },
      sort: true,
    },
    {
      dataField: "#Days",
      text: "#Days",
      formatter: (cellContent, row) => {
        return calculateNumberOfDays(format(row.startdate), format(row.enddate));
      },
      csvText: "Number Of Days",
      csvFormatter: (cell, row, rowIndex) => {
        return calculateNumberOfDays(format(row.startdate), format(row.enddate));
      },
    },
    {
      dataField: "comments",
      text: "Comments",
      csvText: "Comments",
    },
    {
      dataField: "createdAt",
      text: "Submitted On",
      formatter: (cellContent, row) => {
        return format(cellContent);
      },
      csvText: "Leave Applied On",
      csvFormatter: (cell, row, rowIndex) => {
        return format(cell);
      },
    },
    {
      dataField: "updatedAt",
      text: "Last Modified On",
      formatter: (cellContent, row) => {
        return format(cellContent);
      },
      csvText: "Leave Request Modified On",
      csvFormatter: (cell, row, rowIndex) => {
        return format(cell);
      },
    },
  ];

  return (
    <>
      <Row>
        {team && team.name && <h2>{`${team.name} Team Upcoming PTO`}</h2>}
        {error && <Message variant="warning">{error}</Message>}
        {loading && <Loader />}
        {leaves && leaves.length === 0 && (
          <Message variant="success">Your Team did not submitted any PTO yet</Message>
        )}
        {leaves && leaves.length > 0 && (
          <ToolkitProvider
            keyField="_id"
            data={leaves}
            columns={columns}
            exportCSV={{
              fileName: "Team_Leaves.csv",
            }}
          >
            {(props) => (
              <div>
                <BootstrapTable
                  {...props.baseProps}
                  bootstrap4
                  pagination={paginationFactory({ sizePerPage: 5 })}
                  striped
                  hover
                  responsive
                />
                <MyExportCSV {...props.csvProps} />
              </div>
            )}
          </ToolkitProvider>
        )}
      </Row>
      <hr />
      <Row>
        {team && team.name && <h2>{`${team.name} Team Leave Report By Month`}</h2>}
        {groupByMonthLeavesError && <Message variant="warning">{groupByMonthLeavesError}</Message>}
        {groupByMonthLeavesLoading && <Loader />}
        {groupByMonthLeaves && (
          <BarChart
            width={1200}
            height={200}
            data={groupByMonthLeaves}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="monthname" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="LeavesTaken" fill="#8884d8" />
          </BarChart>
        )}
      </Row>
    </>
  );
};

export default TeamAbsence;
