import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path="/user/register" element={<h1>`Register`</h1> } />
            <Route path="/user/login" element={<h1>Login</h1>} />
            <Route path="/food-partner/register" element={<h1>Partner-Register</h1>} />
            <Route path="/food-partner/login" element={<h1>Partner-Login</h1>} />
        </Routes>
    </Router>
  )
}

export default AppRoutes