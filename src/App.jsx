import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./components/ui/loginpage"
import RegisterPage from "./components/ui/registerPage"
import AdminDashboard from "./components/ui/Admindashboard"
import EmpDashboard from "./components/ui/empdashboard"
import { Toaster } from "@/components/ui/sonner";
import Tasks from "./components/ui/tasks"
import Emplist from "./components/ui/emplist"
import EmpTasks from "./components/ui/EmpTasks"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/empdashboard" element={<EmpDashboard />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/viewtasks" element={<Tasks/>} />
        <Route path="/employeelist" element={<Emplist/>} />
        <Route path="/emptasks" element={<EmpTasks/>} />
      </Routes>
      <Toaster richColors position="top-center" />
    </BrowserRouter>
  )
}

export default App
