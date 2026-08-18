import { useAuth } from '../context/AuthContext';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Drawer from './Drawer';
import BottomNav from './BottomNav';
import { useState } from 'react';

export default function Layout() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { toast } = useAuth();

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="app-container">
      <Header toggleDrawer={toggleDrawer} />
      <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
      <main className="content-area">
        <Outlet />
      </main>
      {toast && (
        <div className="auth-toast">
          {toast}
        </div>
      )}

      <BottomNav />
      <BottomNav />
    </div>
  );
}
