import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import AllPosts from './pages/AllPosts';
import Navbar from './components/Navbar';


function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CreatePost />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/posts" element={<AllPosts />} />
      </Routes>
    </Router>
  )
}

export default App
