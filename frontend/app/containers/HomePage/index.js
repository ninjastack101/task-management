import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import injectReducer from "utils/injectReducer";
import injectSaga from "utils/injectSaga";
import H2 from "components/H2";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Modal from "components/Modal";
import io from "socket.io-client";
import config from "config";
import Table from "./table";
import messages from "./messages";
import { addTask, editTask, fetchTasks, deleteTask } from "./actions";
import { makeSelectTasks, makeSelectUserDetails } from "./selectors";
import reducer from "./reducer";
import saga from "./saga";

const socket = io(config.apiRoot);
const key = "home";

const styles = theme => ({
  paddingStyle: {
    padding: theme.spacing(3, 3, 2)
  }
});

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldOpenModal: false,
      formData: {}
    };
    if (props.userDetails.userId) {
      socket.on(props.userDetails.userId, payload => {
        props.loadTasks();
      });
    }
  }

  componentWillUnmount() {
    socket.off(this.props.userDetails.userId);
    console.log("Socket Disconnected");
  }

  columns = [
    { id: "title", label: "Title", minWidth: 200 },
    { id: "description", label: "Description", minWidth: 100 },
    {
      id: "deadline",
      label: "Due Date",
      minWidth: 120,
      format: value => {
        if (!value) {
          return "";
        }
        let d = new Date(value);
        let date =
          parseInt(d.getMonth() + 1) +
          "-" +
          d.getDate() +
          "-" +
          d.getFullYear();

        return date;
      }
    }
  ];

  componentDidMount() {
    this.props.loadTasks();
  }

  toggleModal = flag => {
    this.setState({ shouldOpenModal: flag });
    this.setState({ formData: {} });
  };

  onSubmitForm = event => {
    event.preventDefault();
    const { id, title, description, deadline } = event.target.elements;
    if (!title.value.trim() || !description.value.trim()) {
      return;
    }
    if (id && id.value) {
      this.props.editTasks(
        id.value,
        title.value,
        description.value,
        deadline.value
      );
      this.setState({ formData: {}, shouldOpenModal: false });
    } else {
      this.props.addTasks(title.value, description.value, deadline.value);
      this.setState({ formData: {}, shouldOpenModal: false });
    }
  };

  updateTasks = task => {
    this.setState({ formData: task });
    this.setState({ shouldOpenModal: true });
  };

  render() {
    const { tasks, classes } = this.props;
    return (
      <article>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js application homepage" />
        </Helmet>
        <H2 className={classes.paddingStyle}>
          <FormattedMessage {...messages.header} />
        </H2>
        <Grid
          item
          container
          alignItems="flex-end"
          direction="column"
          wrap="nowrap"
          spacing={10}
          className={classes.paddingStyle}
        >
          <Grid item>
            <Tooltip
              title={<FormattedMessage {...messages.addTask} />}
              placement="top"
            >
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.toggleModal(true)}
              >
                <FormattedMessage {...messages.addTask} />
              </Button>
            </Tooltip>
          </Grid>
        </Grid>
        <div className={classes.paddingStyle}>
          <Table
            rows={tasks}
            columns={this.columns}
            handleClick={this.updateTasks}
            handleDelete={this.props.deleteTasks}
            className={classes.paddingStyle}
          />
        </div>
        {this.state.shouldOpenModal && (
          <Modal
            open={this.state.shouldOpenModal}
            onSubmit={this.onSubmitForm}
            toggle={this.toggleModal}
            task={this.state.formData}
          />
        )}
      </article>
    );
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  tasks: PropTypes.array,
  userDetails: PropTypes.object.isRequired,
  loadTasks: PropTypes.func,
  addTasks: PropTypes.func,
  editTasks: PropTypes.func,
  deleteTasks: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  tasks: makeSelectTasks(),
  userDetails: makeSelectUserDetails()
});

export function mapDispatchToProps(dispatch) {
  return {
    loadTasks: () => {
      dispatch(fetchTasks());
    },
    editTasks: (id, name, description, deadline) => {
      dispatch(editTask(id, name, description, deadline));
    },
    addTasks: (title, description, deadline) => {
      dispatch(addTask(title, description, deadline));
    },
    deleteTasks: id => {
      dispatch(deleteTask(id));
    }
  };
}

const withSaga = injectSaga({ key, saga });
const withReducer = injectReducer({ key, reducer });

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withStyles(styles, { name: "Home" }),
  withSaga,
  withReducer,
  withConnect
)(HomePage);
