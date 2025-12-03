import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AnalyzePage from './pages/AnalyzePage'
import LogoTask from './pages/LogoTask'
import AgentsPage from './pages/AgentsPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-gray-100">
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/analyze" element={<AnalyzePage />} />

          {/* Feature Browser - Coming Soon */}
          {/* <Route path="/features" element={<FeatureBrowserPage />} /> */}

          {/* Legacy/Preserved Routes */}
          <Route path="/tasks/logo" element={<LogoTask />} />
          <Route path="/tasks/:id" element={<LogoTask />} />
          <Route path="/agents" element={<AgentsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App

