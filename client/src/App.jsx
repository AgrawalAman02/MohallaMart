import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from '@/components/ui/toaster';
import { appStore } from '@/store/appStore';

// Import pages
import { Home } from '@/pages/Home';
import { BusinessDetailPage } from '@/pages/Business/BusinessDetailPage';
import { LoginPage } from '@/pages/Auth/LoginPage';
import { RegisterPage } from '@/pages/Auth/RegisterPage';
import { Dashboard } from '@/pages/Business/Dashboard';
import { BusinessEditForm } from '@/pages/Business/BusinessEditForm';
import { BusinessAnalytics } from '@/pages/Business/BusinessAnalytics';
import SearchPage from './pages/search-page';
import BusinessProfile from './pages/Business/BusinessProfile';
import BusinessRegistration from './components/business/BusinessRegistration';

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business/:id" element={<BusinessDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/business/new" element={<BusinessRegistration />} />
          <Route path="/business/edit/:id" element={<BusinessEditForm />} />
          <Route path="/business/analytics/:id" element={<BusinessAnalytics />} />
          <Route path="/business/profile/:id" element={<BusinessProfile />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
}

export default App;