import './App.css';
import Todo from './components/todo/Todo';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { RecoilRoot } from 'recoil';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  todoContent: {
    marginTop: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
        <div>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                gRPC Sample Todo App
              </Typography>
            </Toolbar>
          </AppBar>
        </div>
        <div className={classes.todoContent}>
          <Todo />
        </div>
      </React.Suspense>
    </RecoilRoot>
  );
};

export default App;
