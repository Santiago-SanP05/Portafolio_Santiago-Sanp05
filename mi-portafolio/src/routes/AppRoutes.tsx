import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '../components/navbar';
import Home from '../pages/Home/Home';
import Experience from '../pages/Experience/Experience';
import About from '../pages/about/About';
import Contact from '../pages/Contact/Contact';
import Projects from '../pages/projects/projects';
import Skill from '../pages/skill/Skill';
import Resumen from '../pages/Resume/Resume';

function AppRoutes() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experiencia" element={<Experience />} />
          <Route path="/sobre-mi" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/proyect" element={<Projects />} />
          <Route path="/Skill" element={<Skill />} />
          <Route path="/Resumen" element={<Resumen />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default AppRoutes;