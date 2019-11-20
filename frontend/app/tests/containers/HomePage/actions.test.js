import configureStore from 'redux-mock-store';
import * as actions from '../../../containers/HomePage/actions';
import {
  FETCH_TASKS,
  LOAD_TASKS,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK
}
  from '../../../containers/HomePage/constants';

const mockStore = configureStore();
const store = mockStore();

describe('Task actions', () => {

  beforeEach(() => {
    store.clearActions();
  });

  it('Should dispatch the fetch tasks action', (done) => {
    const expectedActions = {
      type: FETCH_TASKS,
    };
    expect(actions.fetchTasks()).toEqual(expectedActions);
    done();
  });

  it('Should dispatch the load tasks action', (done) => {
    const expectedActions = {
      type: LOAD_TASKS
    };
    expect(actions.setTasks()).toEqual(expectedActions);
    done();
  });

  it('Should dispatch the add tasks action', (done) => {
    const expectedActions = {
      type: ADD_TASK,
    };
    expect(actions.addTask()).toEqual(expectedActions);
    done();
  });

  it('Should dispatch the edit tasks action', (done) => {
    const expectedActions = {
      type: EDIT_TASK,
    };
    expect(actions.editTask()).toEqual(expectedActions);
    done();
  });

  it('Should dispatch the add tasks action', (done) => {
    const expectedActions = {
      type: DELETE_TASK,
    };
    expect(actions.deleteTask()).toEqual(expectedActions);
    done();
  });
});
