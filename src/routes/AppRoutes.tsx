import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar';
import Home from '../pages/Home/Home';
import About from '../pages/about/About';
import Projects from '../pages/projects/projects';
import Skill from '../pages/skill/Skill';

function AppRoutes() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-mi" element={<About />} />
          <Route path="/proyect" element={<Projects />} />
          <Route path="/Skill" element={<Skill />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;