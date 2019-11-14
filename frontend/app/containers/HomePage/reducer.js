import produce from 'immer';
import { LOAD_TASKS } from './constants';

// The initial state of the App
export const initialState = {
  tasks: [],
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_TASKS:
        draft.tasks = action.tasks;
        break;
    }
  });

export default homeReducer;
