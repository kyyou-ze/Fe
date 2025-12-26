import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useAuthStore from './store/authStore';
import MainLayout from './components/layout/MainLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/HomePage';
import NovelsPage from './pages/NovelsPage';
import NovelDetailPage from './pages/NovelDetailPage';
import ReadingPage from './pages/ReadingPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import WriterDashboardPage from './pages/writer/WriterDashboardPage';
import MyNovelsPage from './pages/writer/MyNovelsPage';
import NovelFormPage from './pages/writer/NovelFormPage';
import ChapterListPage from './pages/writer/ChapterListPage';
import ChapterEditorPage from './pages/writer/ChapterEditorPage';

const NotFoundPage = () => (
  <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
      <a href="/"><button className="btn btn-primary">Go Home</button></a>
    </div>
  </div>
);

function App() {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/novels" element={<NovelsPage />} />
        <Route path="/novel/:id" element={<NovelDetailPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      
      {/* Reading Page - No Layout */}
      <Route path="/novel/:novelId/chapter/:chapterId" element={<ReadingPage />} />
      
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      <Route path="/writer" element={<DashboardLayout />}>
        <Route path="dashboard" element={<WriterDashboardPage />} />
        <Route path="novels" element={<MyNovelsPage />} />
        <Route path="novels/create" element={<NovelFormPage />} />
        <Route path="novels/:id/edit" element={<NovelFormPage />} />
        <Route path="novels/:novelId/chapters" element={<ChapterListPage />} />
        <Route path="novels/:novelId/chapters/create" element={<ChapterEditorPage />} />
        <Route path="novels/:novelId/chapters/:chapterId/edit" element={<ChapterEditorPage />} />
      </Route>
      
      <Route element={<MainLayout />}>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
