import { AuthProvider } from './context/AuthContext';
import { AppRouter } from './AppRouter';

import './App.css';
import './components/Navbar.css';

export function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}

export default App