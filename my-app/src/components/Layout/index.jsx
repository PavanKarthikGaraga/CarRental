import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Layout.css';

const pages = [
  { title: 'Browse Cars', path: '/cars' },
  { title: 'About Us', path: '/about' },
  { title: 'Contact', path: '/contact' },
];

const userMenuItems = [
  { title: 'My Dashboard', path: '/dashboard' },
  { title: 'My Bookings', path: '/dashboard/bookings' },
  { title: 'Saved Cars', path: '/dashboard/favorites' },
  { title: 'Settings', path: '/dashboard/settings' },
  { title: 'Logout', path: '/logout' },
];

function Layout({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="layout">
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-content">
            <Link to="/" className="logo">
              AutoVoyage
            </Link>

            <div className="search-bar">
              <input
                type="text"
                className="search-input"
                placeholder="Search vehicles..."
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="nav-links">
              {pages.map((page) => (
                <Link
                  key={page.path}
                  to={page.path}
                  className={`nav-link ${location.pathname === page.path ? 'active' : ''}`}
                >
                  {page.title}
                </Link>
              ))}
              
              <Link to="/list-your-car" className="list-car-btn">
                List your car
              </Link>

              <div className="user-menu">
                <div 
                  className="user-avatar"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  J
                </div>
                <div className={`dropdown-menu ${showUserMenu ? 'show' : ''}`}>
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {children}
      </main>

      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <Link to="/" className="footer-logo">
                AutoVoyage
              </Link>
              <p className="footer-description">
                Experience luxury and performance with our premium car collection. Book your dream car today.
              </p>
              <div className="social-links">
                <a href="#" className="social-link">Facebook</a>
                <a href="#" className="social-link">Twitter</a>
                <a href="#" className="social-link">Instagram</a>
                <a href="#" className="social-link">LinkedIn</a>
              </div>
            </div>

            <div className="footer-section">
              <h3>Quick Links</h3>
              <Link to="/cars" className="footer-link">Browse Cars</Link>
              <Link to="/about" className="footer-link">About Us</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
              <Link to="/list-your-car" className="footer-link">List Your Car</Link>
            </div>

            <div className="footer-section">
              <h3>Support</h3>
              <Link to="/help" className="footer-link">Help Center</Link>
              <Link to="/terms" className="footer-link">Terms of Service</Link>
              <Link to="/privacy" className="footer-link">Privacy Policy</Link>
              <Link to="/faq" className="footer-link">FAQ</Link>
            </div>

            <div className="footer-section">
              <h3>Contact Us</h3>
              <p>📞 123456890</p>
              <p>✉️ support@autovoyage.com</p>
              <p>📍 123  Street</p>
              <p>Vijayawada</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} AutoVoyage. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout; 