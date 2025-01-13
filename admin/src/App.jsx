import React from 'react';
import Admin from './pages/admin/Admin.jsx';
import Navbar from './components/Navbar/Navbar.jsx';

const App = () => {
   return (
        <div className='App'> 
           <Navbar />
           <Admin />
        </div>
    )
}

export default App