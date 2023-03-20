import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import MarketPlace from './pages/MarketPlace';
import CourseDetail from './pages/CourseDetail';
import CourseList from './pages/CourseList';
import VideoCourse from './pages/VideoCourse';
import Profile from './pages/Profile';
import { Layout } from './layout/Layout';
import Favorites from './pages/Favorites';
import Notifications from './pages/Notifications';
function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/courses/play/:id" element={<VideoCourse />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
