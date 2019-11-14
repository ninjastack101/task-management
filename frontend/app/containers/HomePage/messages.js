import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Task Listing',
  },
  addTask: {
    id: `${scope}.addTask`,
    defaultMessage: 'Add Task',
  },
});
