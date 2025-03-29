import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from '@/components/ui/toaster';
import { appStore } from '@/store/appStore';

// Import pages
import { Home } from '@/pages/Home';
import { BusinessDetailPage } from '@/pages/Business/BusinessDetailPage';
import { LoginPage } from '@/pages/Auth/LoginPage';
import { RegisterPage } from '@/pages/Auth/RegisterPage';

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/business/:id" element={<BusinessDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </Provider>
  );
}

export default App;