import reducer from '../../../containers/LanguageProvider/reducer';
import { CHANGE_LOCALE } from '../../../containers/LanguageProvider/constants';
import { DEFAULT_LOCALE } from '../../../i18n';

describe('Fetch home reducer', () => {

  let initialState = {
    locale: DEFAULT_LOCALE
  };

  it('Should return the initial state', (done) => {
    expect(reducer(undefined, {})).toEqual(initialState);
    done();
  });

  it('should handle CHANGE_LOCALE', (done) => {

    const startAction = {
      type: CHANGE_LOCALE,
      locale: {
        0: "somestring"
      }
    };
    expect(reducer(initialState, startAction)).toMatchSnapshot();
    done();
  });
});


