import { useState } from 'react';
import { apiClient } from '../api';
import { Button, TextField } from '@mui/material';
import { StyledMarginAuto, StyledH1, StyledContainer, StyledTextField } from './Common';
import { useLocation, useNavigate } from 'react-router-dom';

const Signin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputValues, setInputValues] = useState({ email: '', password: '' });

  const onChange = (e) => {
    setInputValues((inputValues) => ({ ...inputValues, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (location.pathname.startsWith('/tutor')) {
        const res = await apiClient.post('/tutor/signin', { tutor: { ...inputValues } });
        navigate('/tutor/register');
      } else if (location.pathname.startsWith('/student')) {
        const res = await apiClient.post('/student/signin', { student: { ...inputValues } });
        navigate('/student/register');
      }
    } catch (e) {
      window.alert('로그인 실패!');
    }
  };
  return (
    <StyledContainer>
      <StyledMarginAuto>
        <StyledH1>SignIn</StyledH1>
        <form onSubmit={onSubmit}>
          <StyledTextField>
            <TextField onChange={onChange} label="email" color="secondary" name="email" type="email" />
          </StyledTextField>
          <StyledTextField>
            <TextField onChange={onChange} label="password" color="secondary" name="password" type="password" />
          </StyledTextField>
          <StyledTextField>
            <Button color="secondary" type="submit">
              Sign In
            </Button>
          </StyledTextField>
        </form>
      </StyledMarginAuto>
    </StyledContainer>
  );
};

export default Signin;
