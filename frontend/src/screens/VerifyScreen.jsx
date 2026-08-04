import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { useVerifyMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const VerifyScreen = () => {
  const [code, setCode] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const email = sp.get('email');
  const redirect = sp.get('redirect') || '/';
  const smtpFailed = sp.get('smtpFailed') === 'true';
  const demoEmail = sp.get('demoEmail');
  const demoPassword = sp.get('demoPassword');

  const [verify, { isLoading }] = useVerifyMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await verify({ email, code }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('Email verified successfully!');
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Verify Email</h1>

      {smtpFailed ? (
        // ── SMTP failed banner ───────────────────────────────────────
        <Alert variant='danger' className='mt-3'>
          <Alert.Heading>⚠️ Email Service Unavailable</Alert.Heading>
          <p>
            SMTP is not supported on this hosting platform, so the verification
            email could not be sent. However, <strong>your account has been
            automatically verified</strong> and you can sign in right now.
          </p>
          {demoEmail && (
            <p className='mb-2'>
              You can also use these demo credentials to explore the app:
              <br />
              <strong>Email:</strong> {demoEmail}
              <br />
              <strong>Password:</strong> {demoPassword}
            </p>
          )}
          <hr />
          <div className='d-flex justify-content-end'>
            <Link
              to={`/login?redirect=${redirect}`}
              className='btn btn-danger'
            >
              Sign In Now →
            </Link>
          </div>
        </Alert>
      ) : (
        // ── Normal verify form ───────────────────────────────────────
        <>
          <p>
            Please enter the 6-digit verification code sent to{' '}
            <strong>{email}</strong>.
          </p>
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='code'>
              <Form.Label>Verification Code</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter 6-digit code'
                value={code}
                onChange={(e) => setCode(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button disabled={isLoading} type='submit' variant='primary'>
              Verify
            </Button>

            {isLoading && <Loader />}
          </Form>
        </>
      )}
    </FormContainer>
  );
};

export default VerifyScreen;
