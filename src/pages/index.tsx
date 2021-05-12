import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Button, Container, TextField, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RegisterFormSchemaType, {
  registerFormSchema
} from '../types/register-form';

const useStyles = makeStyles(theme => ({
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  alert: {
    marginBottom: theme.spacing(3)
  },
  textField: {
    width: '100%',
    minHeight: theme.spacing(8),
    marginTop: 0
  },
  textRight: {
    textAlign: 'right'
  }
}));

const Index: NextPage = () => {
  const classes = useStyles();

  const [alertState, setAlertState] =
    useState<
      | { severity: 'success' | 'info' | 'warning' | 'error'; message: string }
      | undefined
    >();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isSubmitted, submitCount }
  } = useForm<RegisterFormSchemaType>({
    resolver: yupResolver(registerFormSchema),
    shouldFocusError: true
  });

  useEffect(() => {
    if (submitCount > 1) {
      setAlertState(undefined);
    }
  }, [submitCount]);

  const onSubmit = handleSubmit(async ({ name, email, password }) => {
    try {
      const response = await fetch('/api/', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 500) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      setAlertState({ severity: 'success', message: data.message });
    } catch (error) {
      setAlertState({ severity: 'error', message: error.message });
    } finally {
      reset();
    }
  });

  return (
    <Container maxWidth="xs" className={classes.container}>
      {alertState && (
        <Alert className={classes.alert} severity={alertState.severity}>
          {alertState.message}
        </Alert>
      )}

      <form noValidate autoComplete="off" onSubmit={onSubmit}>
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          margin="dense"
          className={classes.textField}
          {...register('name')}
          error={(isSubmitted || touchedFields.name) && !!errors.name}
          helperText={
            (isSubmitted || touchedFields.name) && errors.name?.message
          }
        />
        <TextField
          type="email"
          id="email"
          label="Email"
          variant="outlined"
          margin="dense"
          className={classes.textField}
          {...register('email')}
          error={(isSubmitted || touchedFields.email) && !!errors.email}
          helperText={
            (isSubmitted || touchedFields.email) &&
            errors.email &&
            errors.email.message
          }
        />
        <TextField
          type="password"
          id="password"
          label="Password"
          variant="outlined"
          margin="dense"
          className={classes.textField}
          {...register('password')}
          error={(isSubmitted || touchedFields.password) && !!errors.password}
          helperText={
            (isSubmitted || touchedFields.password) &&
            errors.password &&
            errors.password.message
          }
        />

        <div className={classes.textRight}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Index;
