import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Signup from './components/Signup';
import Signin from './components/Signin';
import StudentRegister from './components/StudentRegister';
import TutorRegister from './components/TutorRegister';

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/tutor/signup" element={<Signup />} />
        <Route path="/tutor/signin" element={<Signin />} />
        <Route path="/student/signup" element={<Signup />} />
        <Route path="/student/signin" element={<Signin />} />
        <Route path="/tutor/register" element={<TutorRegister />} />
        <Route path="/student/register" element={<StudentRegister />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
