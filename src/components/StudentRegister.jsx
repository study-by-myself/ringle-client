import Timetable from 'react-timetable-events';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { apiClient } from '../api';
import styled from '@emotion/styled';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { StyledColumn, StyledContainer, StyledFlex, StyledMarginAuto } from './Common';
import PersonIcon from '@mui/icons-material/Person';

const StudentRegister = () => {
  const [startTime, setStartTime] = useState(dayjs());
  const [ticketMinute, setTicketMinute] = useState(20);
  const [tutoring, setTutoring] = useState([]);
  const [rawTutoring, setRawTutoring] = useState([]);
  const [tutors, setTutors] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState();

  const getSchedules = async () => {
    try {
      const res = await apiClient.get('/student/tutoring', {
        params: { start_time: startTime, ticket_minutes: ticketMinute },
      });
      setRawTutoring(res.data.tutoring);
      setTutoring(parseSchedule(res.data.tutoring));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSchedules();
  }, [ticketMinute]);

  const KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  const parseSchedule = (tutoring) => {
    const days = {
      sunday: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
    };
    Object.keys(tutoring).forEach((time) => {
      const key = KEYS[dayjs(time).get('day')];

      days[key].push(...getTimeTableObj(tutoring[time]));
    });
    return days;
  };

  const getTimeTableObj = (tutoring) =>
    tutoring.map((item) => ({
      id: item.id,
      name: '',
      startTime: new Date(dayjs(item.start_time)),
      endTime: new Date(dayjs(item.start_time).add(ticketMinute, 'minute')),
    }));

  const onChange = async (e) => {
    const tutorings = rawTutoring[e.target.value];
    const tutor_ids = tutorings.map((item) => item.tutor_id);
    try {
      const res = await apiClient.get('/student/tutor', { params: { tutor_ids } });
      setTutors(res.data.tutor);
      setSelectedStartTime(e.target.value);
    } catch (e) {
      window.alert('튜터를 불러올 수 없었습니다.');
    }
  };

  const onRegister = async (id) => {
    const tutoring = rawTutoring[selectedStartTime].find((item) => item.tutor_id === id);
    try {
      const res = await apiClient.patch('/student/register', {
        tutoring_id: tutoring.id,
        ticket_minutes: ticketMinute,
      });
      window.alert('예약이 완료되었습니다.');
      window.location.reload();
    } catch (e) {
      window.alert(e);
    }
  };

  const onClickTicket = (e) => {
    setTicketMinute(parseInt(e.target.value));
  };

  return (
    <StyledContainer>
      <StyledFlex>
        <Button onClick={onClickTicket} color="secondary" value={20}>
          20분 수강권
        </Button>
        <Button onClick={onClickTicket} color="secondary" value={40}>
          40분 수강권
        </Button>
      </StyledFlex>
      <StyledScheduler>
        {tutoring ? (
          <Timetable events={tutoring} style={{ height: '1500px' }} hoursInterval={{ from: 0, to: 24 }} />
        ) : (
          'Loading...'
        )}
      </StyledScheduler>
      <StyledMarginAuto>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Start Time</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedStartTime}
            label="Select Start Time"
            onChange={onChange}
          >
            {Object.keys(rawTutoring).map((key) => (
              <MenuItem value={key}>{key}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <StyledFlex>
          {tutors &&
            tutors.map((item) => (
              <StyledColumn key={item.id}>
                <div>
                  <PersonIcon fontSize="large" color="secondary" />
                </div>
                <div>{item.name}</div>
                <div>{item.email}</div>
                <div>{item.description}</div>
                <Button color="secondary" type="submit" onClick={() => onRegister(item.id)}>
                  OK
                </Button>
              </StyledColumn>
            ))}
        </StyledFlex>
      </StyledMarginAuto>
    </StyledContainer>
  );
};

const StyledScheduler = styled.div`
  height: 60vh;
  overflow: scroll;
`;

export default StudentRegister;
