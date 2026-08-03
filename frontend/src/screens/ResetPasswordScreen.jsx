import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useResetPasswordMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ResetPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await resetPassword({ token, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Password reset successfully!');
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Reset Password</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='password'>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter new password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='confirmPassword'>
          <Form.Label>Confirm New Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm new password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button disabled={isLoading} type='submit' variant='primary'>
          Reset Password
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default ResetPasswordScreen;
