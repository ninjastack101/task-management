import configureStore from 'redux-mock-store';
import * as actions from '../../../containers/LanguageProvider/actions';
import {
  CHANGE_LOCALE
}
  from '../../../containers/LanguageProvider/constants';

const mockStore = configureStore();
const store = mockStore();

describe('Language provider actions', () => {

  beforeEach(() => {
    store.clearActions();
  });

  it('Should dispatch the cjanges locale action', (done) => {
    const expectedActions = {
      type: CHANGE_LOCALE,
    };
    expect(actions.changeLocale()).toEqual(expectedActions);
    done();
  });
});