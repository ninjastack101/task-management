import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import H2 from "../H2";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4, 4, 3)
  },
  right: {
    float: "right"
  },
  margin: {
    padding: theme.spacing(10)
  },
  border: {
    border: "2px solid red"
  },
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: 200
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center"
  }
}));

export default function TransitionsModal({ open, toggle, onSubmit, task }) {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = React.useState(
    task.deadline || new Date()
  );
  function handleDateChange(d) {
    setSelectedDate(d);
  }
  return (
    <div className={classes.margin}>
      <Modal
        className={classes.modal}
        open={open}
        onClose={() => toggle(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <H2>{task.id ? "Edit" : "Add"} Task</H2>
            <Grid container wrap="nowrap" spacing={4}>
              <article>
                <form className={classes.form} onSubmit={onSubmit}>
                  <input
                    className={classes.input}
                    name="id"
                    type="hidden"
                    value={task.id || ""}
                  />
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      className={classes.textField}
                      label="Enter Name"
                      name="title"
                      fullWidth
                      required
                      defaultValue={task.title}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      rows="2"
                      cols="100"
                      name="description"
                      fullWidth
                      required
                      className={classes.textField}
                      defaultValue={task.description}
                      multiline
                      variant="outlined"
                      label="Enter Description"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils} fullWidth>
                      <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        name="deadline"
                        margin="normal"
                        id="date-picker-dialog"
                        label="Due Date"
                        autoOk
                        value={selectedDate}
                        variant="outlined"
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date"
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      className={classes.input}
                      variant="contained"
                      color="primary"
                    >
                      SUBMIT
                    </Button>
                  </Grid>
                </form>
              </article>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
