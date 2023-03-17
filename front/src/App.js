import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import MarketPlace from './pages/MarketPlace';
import CourseDetail from './pages/CourseDetail';
import CourseList from './pages/CourseList';
import VideoCourse from './pages/VideoCourse';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Profile from './pages/Profile';
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/courses" element={<CourseList/>} />
        <Route path="/courses/play/:id" element={<VideoCourse/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
