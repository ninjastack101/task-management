import reducer from '../../../containers/HomePage/reducer';
import { LOAD_TASKS } from '../../../containers/HomePage/constants';

describe('Fetch home reducer', () => {

  let initialState = {
    tasks: [],
  };

  it('Should return the initial state', (done) => {
    expect(reducer(undefined, {})).toEqual(initialState);
    done();
  });

  it('should handle FETCH_PRODUCTS_LIST_REQUEST', (done) => {

    const startAction = {
      type: LOAD_TASKS,
      tasks: {
        0: "somestring"
      }
    };
    expect(reducer(initialState, startAction)).toMatchSnapshot();
    done();
  });
});
