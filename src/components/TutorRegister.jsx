import {
  StyledContainer,
  StyledMarginAuto,
  StyledH1,
  StyledTextField,
  StyledH3,
  StyledFlex,
  StyledTag,
} from './Common';
import { Button, TextField } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { apiClient } from '../api';

const TutorRegister = () => {
  const [startTime, setStartTime] = useState(dayjs().format('YYYY-MM-DDTHH:mm:ss'));
  const [tutorings, setTutorings] = useState();

  const getTutoring = async () => {
    try {
      const res = await apiClient.get('/tutor/tutoring');
      setTutorings(res.data.tutoring);
    } catch (e) {
      window.alert('예약 내역을 가져올 수 없습니다.');
    }
  };

  useEffect(() => {
    getTutoring();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await apiClient.post('/tutor/tutoring', {
        start_time: startTime,
      });
      window.alert('수강시간이 등록되었습니다.');
      window.location.reload();
    } catch (e) {
      window.alert('수강시간 등록 실패!');
    }
  };

  const onChange = (e) => {
    setStartTime(e.target.value);
  };

  return (
    <StyledContainer>
      <StyledMarginAuto>
        <div>
          <StyledH1>예약 내역</StyledH1>
          <div>
            {tutorings &&
              tutorings.map((item) => (
                <StyledFlex>
                  <StyledTag>{item.status}</StyledTag>
                  <div>{item.start_time}</div>
                </StyledFlex>
              ))}
          </div>
        </div>
        <div>
          <StyledH1>수강 가능한 시간을 선택해주세요</StyledH1>
          <StyledH3>정각을 기준으로 30분 단위로만 가능합니다 (예: 00분 또는 30분)</StyledH3>
          <form onSubmit={onSubmit}>
            <StyledTextField>
              <TextField
                id="datetime-local"
                label="Start Time"
                type="datetime-local"
                defaultValue={startTime}
                onChange={onChange}
                sx={{ width: 250 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </StyledTextField>
            <Button color="secondary" type="submit">
              OK
            </Button>
          </form>
        </div>
      </StyledMarginAuto>
    </StyledContainer>
  );
};

export default TutorRegister;
