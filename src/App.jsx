import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Story from './pages/Story';
import Members from './pages/Members';
import Live from './pages/Live';
import Music from './pages/Music';
import Edition from './pages/Edition';
import Customize from './pages/Customize';
import Cart from './pages/Cart';
import Saved from './pages/Saved';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import MyPage from './pages/MyPage';


function App() {
  return (
    <ShopProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="story" element={<Story />} />
              <Route path="members" element={<Members />} />
              <Route path="live" element={<Live />} />
              <Route path="music" element={<Music />} />
              <Route path="edition" element={<Edition />} />
              <Route path="customize" element={<Customize />} />
              <Route path="cart" element={<Cart />} />
              <Route path="saved" element={<Saved />} />
              <Route path="login" element={<Login />} />
              <Route path="mypage" element={<MyPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ShopProvider>
  );
}



export default App;

