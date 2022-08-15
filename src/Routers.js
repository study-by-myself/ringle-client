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
        <Route exact path="/" element={<Main />} />
        <Route exact path="/tutor/signup" element={<Signup />} />
        <Route exact path="/tutor/signin" element={<Signin />} />
        <Route exact path="/student/signup" element={<Signup />} />
        <Route exact path="/student/signin" element={<Signin />} />
        <Route exact path="/tutor/register" element={<TutorRegister />} />
        <Route exact path="/student/register" element={<StudentRegister />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
