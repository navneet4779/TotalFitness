import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { X } from 'lucide-react';

// --- Logo Configuration ---
// IMPORTANT: Replace with your actual logo URL or import
// For best results, use an SVG logo or a high-quality PNG.
// Option 1: Place in `public` folder (e.g., public/logo-light.svg, public/logo-dark.svg)
// const logoLightUrl = '/logo-light.svg';
// const logoDarkUrl = '/logo-dark.svg'; // If you have a different logo for dark/scrolled backgrounds

// Using a more appealing placeholder for demonstration
let logoUrlLight = 'https://placehold.co/200x70/FFFFFF/000000?text=YourLogo&font=montserrat&bold'; // For transparent/dark nav
let logoUrlDark = 'https://placehold.co/200x70/0A0A0A/FFFFFF?text=YourLogo&font=montserrat&bold'; // For white/light nav

// You'd typically have one logo that works on both, or switch them based on `isScrolled`
// For simplicity here, we'll use one, but you can adapt it.
// Let's assume you have a logo that works well on light backgrounds for the scrolled state
// and you want a white version for the initial transparent state.
// If your logo is one color and adapts (e.g. white text logo), that's easier.
// logoUrl = myImportedLogo; // from import statement


// --- Reusable NavLink Component ---
const NavLink = ({
    to,
    children,
    onClick,
    className = '',
    isScrolled, // Pass isScrolled to adapt styling
    mobile // boolean to indicate mobile specific styling needs
}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname === to;

    const handleClick = () => {
        navigate(to);
        if (onClick) {
            onClick();
        }
    };

    // Base styles
    let baseClasses = `
        font-medium tracking-wide cursor-pointer transition-all duration-300 ease-in-out
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
    `;
    let activeClasses = '';
    let hoverClasses = '';

    if (mobile) {
        baseClasses += ' block w-full text-center py-4 text-lg rounded-lg';
        activeClasses = isActive ? 'bg-orange-500 text-white font-semibold shadow-md' : 'text-slate-700';
        hoverClasses = isActive ? 'hover:bg-orange-600' : 'hover:bg-orange-100 hover:text-orange-600';
    } else { // Desktop
        baseClasses += ` py-2 px-4 rounded-md ${isScrolled ? 'text-slate-700 focus-visible:ring-orange-500' : 'text-white focus-visible:ring-white'}`;
        activeClasses = isActive
            ? (isScrolled ? 'text-orange-600 font-semibold bg-orange-500/10' : 'text-orange-300 font-semibold')
            : '';
        hoverClasses = isActive
            ? (isScrolled ? 'hover:bg-orange-500/20' : 'hover:text-orange-200')
            : (isScrolled ? 'hover:text-orange-600' : 'hover:text-orange-100');
    }

    return (
        <li
            onClick={handleClick}
            className={`${baseClasses} ${activeClasses} ${hoverClasses} ${className}`}
            role="menuitem"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleClick()}
        >
            {children}
        </li>
    );
};

// --- Main Navigation Bar Component ---
export default function MainNavBar() {
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [navbarHeight, setNavbarHeight] = useState('h-24'); // Initial height

    // Use the appropriate logo based on scroll state (example)
    const currentLogo = isScrolled ? logoUrlDark : logoUrlLight;
    // If you have one logo that works for both, just use: const currentLogo = yourSingleLogoUrl;

    const handleScroll = useCallback(() => {
        const scrolled = window.pageYOffset > 60;
        setIsScrolled(scrolled);
        setNavbarHeight(scrolled ? 'h-20' : 'h-24'); // Navbar shrinks on scroll
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const navLinkItems = [
        { to: '/', label: 'Home' },
        { to: '/about-us', label: 'About Us' },
        { to: '/services', label: 'Services' },
        { to: '/contact', label: 'Contact Us' },
    ];

    const navClasses = `
        fixed top-0 left-0 w-full z-50
        flex items-center justify-between
        transition-all duration-300 ease-in-out
        px-5 md:px-8 lg:px-12 xl:px-20
        ${navbarHeight}
        ${isScrolled
            ? "bg-white/95 backdrop-blur-lg shadow-xl border-b border-slate-200/80"
            : "bg-gradient-to-b from-slate-900/70 via-slate-900/40 to-transparent"
        }
    `;

    const buttonBase = `
        py-2.5 px-6 text-sm rounded-full font-semibold
        transition-all duration-300 ease-in-out transform hover:scale-105
        focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 shadow-md hover:shadow-lg
    `;

    const primaryButtonClasses = (scrolled) => `
        ${buttonBase}
        ${scrolled
            ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600 focus-visible:ring-orange-500"
            : "bg-white text-slate-800 border-white hover:bg-gray-50 focus-visible:ring-gray-300"
        }
    `;

    const secondaryButtonClasses = (scrolled) => `
        ${buttonBase}
        ${scrolled
            ? "text-orange-500 border-2 border-orange-500 hover:bg-orange-500/10 focus-visible:ring-orange-500"
            : "text-white border-2 border-white hover:bg-white/10 focus-visible:ring-white"
        }
    `;

    const mobileMenuPanelClasses = `
        fixed top-0 right-0 h-screen w-full max-w-md sm:max-w-sm bg-white
        text-slate-800 shadow-2xl z-[100]
        transform transition-transform duration-500 ease-out
        flex flex-col
        ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
    `;

    return (
        <nav className={navClasses} aria-label="Main navigation">
            <div className="flex-shrink-0">
                <img
                    onClick={() => navigate('/')}
                    src={currentLogo} // Use the dynamic logo
                    alt="Company Logo"
                    className={`h-10 md:h-12 w-auto cursor-pointer transition-all duration-300 ease-in-out object-contain`}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = isScrolled ? logoUrlDark : logoUrlLight; // Fallback to placeholder
                    }}
                />
            </div>

            <div className="hidden lg:flex items-center justify-center flex-grow">
                <ul className="flex items-center space-x-3">
                    {navLinkItems.map(item => (
                        <NavLink key={item.to} to={item.to} isScrolled={isScrolled}>
                            {item.label}
                        </NavLink>
                    ))}
                </ul>
            </div>

            <div className="hidden lg:flex items-center space-x-4">
                <button onClick={() => navigate('/login')} className={secondaryButtonClasses(isScrolled)}>
                    Login
                </button>
                <button onClick={() => navigate('/register')} className={primaryButtonClasses(isScrolled)}>
                    Register
                </button>
            </div>

            <div className="lg:hidden flex items-center">
                <button
                    onClick={toggleMobileMenu}
                    aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                    aria-expanded={isMobileMenuOpen}
                    aria-controls="mobile-menu-panel"
                    className={`p-2 rounded-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
                        ${isScrolled ? "text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-500" : "text-white hover:bg-white/10 focus-visible:ring-white"}`}
                >
                    <GiHamburgerMenu className="text-3xl" />
                </button>
            </div>

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-[90] lg:hidden"
                    onClick={closeMobileMenu}
                    aria-hidden="true"
                />
            )}

            <div id="mobile-menu-panel" className={mobileMenuPanelClasses}>
                <div className="flex justify-between items-center p-5 border-b border-slate-200">
                    <img src={logoUrlDark} alt="Logo" className="h-9 object-contain"/>
                    <button
                        onClick={closeMobileMenu}
                        aria-label="Close navigation menu"
                        className="p-2 rounded-md text-slate-500 hover:text-orange-600 hover:bg-orange-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    >
                        <X size={28} />
                    </button>
                </div>

                <ul className="flex flex-col p-5 space-y-2 mt-4">
                    {navLinkItems.map(item => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            onClick={closeMobileMenu}
                            mobile
                            isScrolled={true} // Mobile menu always has a light background, so treat as scrolled for styling
                        >
                            {item.label}
                        </NavLink>
                    ))}
                </ul>

                <div className="p-6 mt-auto border-t border-slate-200 space-y-4">
                    <button
                        onClick={() => { navigate('/register'); closeMobileMenu(); }}
                        className={`${buttonBase} w-full bg-orange-500 text-white border-orange-500 hover:bg-orange-600 focus-visible:ring-orange-500`}
                    >
                        Register
                    </button>
                    <button
                        onClick={() => { navigate('/login'); closeMobileMenu(); }}
                        className={`${buttonBase} w-full text-orange-600 border-2 border-orange-500 hover:bg-orange-500/10 focus-visible:ring-orange-500`}
                    >
                        Login
                    </button>
                </div>
            </div>
        </nav>
    );
}