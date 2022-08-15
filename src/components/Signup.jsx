import { Button, TextField } from '@mui/material';
import styled from '@emotion/styled';
import { useState } from 'react';
import { apiClient } from '../api';
import { useLocation, useNavigate } from 'react-router-dom';
import { StyledMarginAuto, StyledH1, StyledContainer, StyledTextField } from './Common';

const Signup = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputValues, setInputValues] = useState({ name: '', email: '', password: '' });

  const onChange = (e) => {
    setInputValues((inputValues) => ({ ...inputValues, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (location.pathname.startsWith('/tutor')) {
        const res = await apiClient.post('/tutor/signup', { tutor: { ...inputValues } });
        navigate('/tutor/signin');
      } else if (location.pathname.startsWith('/student')) {
        const res = await apiClient.post('/student/signup', { student: { ...inputValues } });
        navigate('/student/signin');
      }
    } catch (e) {
      window.alert('회원가입 실패!');
    }
  };
  return (
    <StyledContainer>
      <StyledMarginAuto>
        <StyledH1>SignUp</StyledH1>
        <form onSubmit={onSubmit}>
          <StyledTextField>
            <TextField onChange={onChange} label="name" color="secondary" name="name" focused />
          </StyledTextField>
          <StyledTextField>
            <TextField onChange={onChange} label="email" color="secondary" name="email" type="email" />
          </StyledTextField>
          <StyledTextField>
            <TextField onChange={onChange} label="password" color="secondary" name="password" type="password" />
          </StyledTextField>
          <StyledTextField>
            <Button color="secondary" type="submit">
              Sign Up
            </Button>
          </StyledTextField>
        </form>
      </StyledMarginAuto>
    </StyledContainer>
  );
};

export default Signup;
