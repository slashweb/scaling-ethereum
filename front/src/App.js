import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import MarketPlace from './pages/MarketPlace';
import CourseDetail from './pages/CourseDetail';
import VideoCourse from './pages/VideoCourse';
import Profile from './pages/Profile';
import { Layout } from './layout/Layout';
import Favorites from './pages/Favorites';
import Notifications from './pages/Notifications';
import Subscriptions from './pages/Subscriptions';
import Subscribers from './pages/Subscribers';
import { useSelector } from 'react-redux';
import PageNotFound from './pages/special/PageNotFound';
import ProfileOtherUsers from './pages/ProfileOtherUsers';
function App() {
  const type= useSelector((state) => state.user.type)
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/marketplace" element={<MarketPlace />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/courses/play/:id" element={<VideoCourse />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:user" element={<ProfileOtherUsers />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/subscribers" element={type==='creator'?<Subscribers />:<PageNotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
