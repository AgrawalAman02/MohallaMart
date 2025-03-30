import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from './components/ui/toaster';
import { appStore } from './store/appStore';

// Import pages

import { Home } from './pages/Home';
import { BusinessDetailPage } from './pages/Business/BusinessDetailPage';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { Dashboard } from './pages/Business/Dashboard';
import SearchPage from './pages/search/search-page';
import BusinessProfile from './pages/Business/BusinessProfile';

//import { Home } from '@/pages/Home';
//import { BusinessDetailPage } from '@/pages/Business/BusinessDetailPage';
//import { LoginPage } from '@/pages/Auth/LoginPage';
//import { RegisterPage } from '@/pages/Auth/RegisterPage';
//import { Dashboard } from '@/pages/Business/Dashboard';
import { BusinessRegistrationForm } from '@/components/business/BusinessRegistration';
import { BusinessEditForm } from '@/pages/Business/BusinessEditForm';
import { BusinessAnalytics } from '@/pages/Business/BusinessAnalytics';


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

          {/* Add routes for managing deals and businesses */}
          <Route path="/business/deals/new" element={<div>New Deal Form</div>} />
          <Route path="/business/deals/edit/:id" element={<div>Edit Deal Form</div>} />
          {/* <Route path="/business/new" element={<div>New Business Form</div>} /> */}
          <Route path="/business/manage/:id" element={<div>Manage Business</div>} />
          <Route path="/business-profile/:id" element={<BusinessProfile />} />
          <Route path="/search" element={<SearchPage />} />

          <Route path="/business/new" element={<BusinessRegistrationForm />} />
          <Route path="/business/edit/:id" element={<BusinessEditForm />} />
          <Route path="/business/analytics/:id" element={<BusinessAnalytics />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
}

export default App;

