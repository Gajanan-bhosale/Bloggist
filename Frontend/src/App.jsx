import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Blog from "./pages/blog/Blog";
import AllBlogs from "./pages/allBlogs/AllBlogs";
import NoPage from "./pages/nopage/NoPage";
import BlogInfo from "./pages/blogInfo/BlogInfo";
import AdminLogin from "./pages/admin/adminLogin/AdminLogin";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import MyState from "./context/data/myState";
import { Toaster } from "react-hot-toast";
import CreateBlog from "./pages/admin/createBlog/CreateBlog";
import SignIn from "./pages/createAccount/SignIn";
import SignUp from "./pages/createAccount/SignUp";

function App() {
  const hasVisitedBefore = localStorage.getItem('hasVisitedBefore') === 'true';

  return (
    <MyState>
      <Router>
        <Routes>
          <Route path="/" element={hasVisitedBefore ? <SignIn /> : <SignUp onSignUp={() => window.location.reload()} />} />
          <Route path="/sign-up" element={<SignUp onSignUp={() => window.location.reload()} />} />
          <Route path="*" element={<Navigate to={hasVisitedBefore ? "/sign-in" : "/sign-up"} />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/allblogs" element={<AllBlogs />} />
          <Route path="/bloginfo/:id" element={<BlogInfo />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="//createblog" element={<CreateBlog />} />
          <Route path="/*" element={<NoPage />} />
        </Routes>
        <Toaster />
      </Router>
    </MyState>
  )
}

export default App

