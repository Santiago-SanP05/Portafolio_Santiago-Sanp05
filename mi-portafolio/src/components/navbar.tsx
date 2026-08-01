import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md rounded-xl border border-gray-200 mx-4 my-4">
            <div className="flex items-center space-x-8">
                <Link to="/"><h5 className="text-gray-700 font-medium hover:text-blue-600 cursor-pointer transition-all duration-200 hover:scale-105">
                    Inicio
                </h5></Link>
                <Link to="/experiencia"><h5 className="text-gray-700 font-medium hover:text-blue-600 cursor-pointer transition-all duration-200 hover:scale-105">
                    Experiencia
                </h5></Link>
                <Link to="/sobre-mi"><h5 className="text-gray-700 font-medium hover:text-blue-600 cursor-pointer transition-all duration-200 hover:scale-105">
                    Sobre mi
                </h5></Link>
                <Link to="/contacto"><h5 className="text-gray-700 font-medium hover:text-blue-600 cursor-pointer transition-all duration-200 hover:scale-105">
                    contacto
                </h5></Link>
                <Link to="/proyect"><h5 className="text-gray-700 font-medium hover:text-blue-600 cursor-pointer transition-all duration-200 hover:scale-105">
                    projectos
                </h5></Link>
                <Link to="/Skill"><h5 className="text-gray-700 font-medium hover:text-blue-600 cursor-pointer transition-all duration-200 hover:scale-105">
                    Habilidades
                </h5></Link>
                <Link to="/Resumen"><h5 className="text-gray-700 font-medium hover:text-blue-600 cursor-pointer transition-all duration-200 hover:scale-105">
                    Resumen
                </h5></Link>
            </div>
        </nav>
    )
}

export default Navbar