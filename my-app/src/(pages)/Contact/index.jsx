import './Contact.css';

const contactInfo = [
  {
    icon: '📞',
    title: 'Phone',
    details: ['+91 9876543210', '+91 9876543210'],
  },
  {
    icon: '✉️',
    title: 'Email',
    details: ['support@autovoyage.com', 'info@autovoyage.com'],
  },
  {
    icon: '📍',
    title: 'Location',
    details: ['123 Street','vijayawada'],
  },
  {
    icon: '⏰',
    title: 'Business Hours',
    details: ['Mon - Fri: 9AM - 6PM', 'Sat - Sun: 10AM - 4PM'],
  },
];

function Contact() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">Contact Us</h1>
          <p className="hero-subtitle">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <div className="info-cards">
                {contactInfo.map((info, index) => (
                  <div key={index} className="info-card">
                    <div className="info-icon">{info.icon}</div>
                    <div className="info-content">
                      <h3>{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <form onSubmit={handleSubmit} className="contact-form">
                <h2>Send Message</h2>
                
                <div className="form-grid">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <input
                      type="email"
                      placeholder="Email"
                      required
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <input
                      type="text"
                      placeholder="Subject"
                      required
                    />
                  </div>
                  
                  <div className="form-group full-width">
                    <textarea
                      placeholder="Message"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  
                  <div className="form-group full-width">
                    <button type="submit" className="submit-button">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact; 