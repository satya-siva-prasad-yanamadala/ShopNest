import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useForgotPasswordMutation } from '../slices/usersApiSlice';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message || 'Email sent');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Forgot Password</h1>
      <p>Enter your email address and we will send you a link to reset your password.</p>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button disabled={isLoading} type='submit' variant='primary'>
          Send Reset Link
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default ForgotPasswordScreen;
