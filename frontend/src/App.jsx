// import React from 'react';

// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import './App.css';
// import Register from './Auth/Register';
// import Login from './Auth/Login';
// import Dashboard from './Pages/Dashboard';
// import { useAuth } from './Contexts/AuthContext';



// import ProfileManagementPage from './Pages/ProfileManagementPage';
// import ProtectedRoute from './components/ProtectedRoute';


// const App = () => {
//   const { isAuthenticated } = useAuth();
  

//   return (
//     <div>
//       <Router>
//         <Routes>
//         <Route exact path="/admin" component={ProfileManagementPage} />
//         <Route path='/' element={!isAuthenticated ? <Register /> : <Navigate to='/dashboard' />} />
//           <Route path='/login' element={!isAuthenticated ? <Login /> : <Navigate to='/dashboard' />} />
//           <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Navigate to='/login' />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// };

// export default App;





// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Register from './Auth/Register';
import Login from './Auth/Login';
import Dashboard from './Pages/Dashboard';
import { useAuth } from './Contexts/AuthContext';
import ProfileManagementPage from './Pages/ProfileManagementPage';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  const { isAuthenticated, userData } = useAuth();
  const isAdmin = userData && userData.role === 'SUPERADMIN';

  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated} role={isAdmin ? 'SUPERADMIN' : null}><ProfileManagementPage /></ProtectedRoute>} /> */}

          <Route path="/" element={!isAuthenticated ? <Register /> : <Navigate to="/admin" />} />
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/admin" />} />
          <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated} role={isAdmin ? 'SUPERADMIN' : null}><ProfileManagementPage /></ProtectedRoute>} />
          </Routes>
      </Router>
    </div>
  );
};

export default App;




