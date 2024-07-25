import './App.css'
import Navbar from './components/navbar.jsx'
import { Outlet } from 'react-router-dom';
import { ConfigProvider } from 'antd';

function App() {
  return (
    <div className='App'>
        <Navbar />
        <ConfigProvider
              theme={{
                components: {
                  Table: {
                    headerBg: "#EBEBEB"
                  },
                },
        }}>
          <Outlet />    
        </ConfigProvider>
        
    </div>
  )
}

export default App
