import { Link, NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinkClass = ({ isActive }: { isActive: boolean }) =>
        `relative font-bold text-white text-lg tracking-wide transition 
        hover:after:w-full after:transition-all after:duration-300 after:absolute after:-bottom-1 after:left-0 
        after:h-[2px] after:bg-white after:w-0 ${isActive ? 'after:w-full' : ''}`;

    const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
        `block text-base font-medium px-4 py-2 rounded-md transition
    ${isActive ? 'bg-white text-blue-700' : 'text-white hover:bg-white hover:text-blue-700'}`;


    return (
        <nav className="bg-gradient-to-r from-blue-400 to-blue-700 shadow-md w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="text-2xl font-extrabold text-white tracking-tight shadow-sm">
                        <Link to="/" className="hover:text-gray-100">
                            Product Inventory
                        </Link>
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex gap-10 items-center">
                        <NavLink to="/" end className={navLinkClass}>
                            Home
                        </NavLink>
                        <NavLink to="/products" end className={navLinkClass}>
                            Products
                        </NavLink>
                        <NavLink to="/products/new" className={navLinkClass}>
                            Add Product
                        </NavLink>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} className="text-white focus:outline-none">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-blue-600 w-full px-2 pb-4 space-y-2">
                    <NavLink to="/" end onClick={toggleMenu} className={mobileLinkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/products" end onClick={toggleMenu} className={mobileLinkClass}>
                        Products
                    </NavLink>
                    <NavLink to="/products/new" onClick={toggleMenu} className={mobileLinkClass}>
                        Add Product
                    </NavLink>
                </div>
            )}
        </nav>
    );
}
