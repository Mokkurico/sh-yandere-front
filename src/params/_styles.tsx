import { makeStyles } from '@material-ui/styles';

export const styleSceneTodoApp = makeStyles({
  Background: {
    backgroundColor: '#FFC9FF',
    width: '100%',
    minHeight: '100vh',
    position: 'relative',
  },
});

export const styleCircleButton = makeStyles({
  AddButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    fontSize: '32px',

    width: '64px',
    height: '64px',
    borderRadius: '32px',

    border: 'none',
  },
});
