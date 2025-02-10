import React from 'react';
import './About.css';

const features = [
  {
    icon: '🚀',
    title: 'Fast & Easy Booking',
    description: 'Book your dream car in minutes with our streamlined process.',
  },
  {
    icon: '🔒',
    title: 'Secure & Reliable',
    description: 'All cars are fully insured and regularly maintained for your safety.',
  },
  {
    icon: '🚗',
    title: 'Wide Selection',
    description: 'Choose from our extensive collection of premium vehicles.',
  },
  {
    icon: '🎧',
    title: '24/7 Support',
    description: 'Our dedicated team is always here to help you.',
  },
];

const team = [
  {
    name: 'Pavan Karthik',
    // role: 'CEO & Founder',
    image: 'https://cdn.iconscout.com/icon/free/png-512/free-person-icon-download-in-svg-png-gif-file-formats--user-male-young-profile-interface-vol-1-pack-icons-2202553.png?f=webp&w=256',
  },
  {
    name: 'MD Althaf',
    // role: 'Operations Director',
    image: 'https://cdn.iconscout.com/icon/free/png-512/free-person-icon-download-in-svg-png-gif-file-formats--user-male-young-profile-interface-vol-1-pack-icons-2202553.png?f=webp&w=256',
  },
  {
    name: 'Sasidhar',
    // role: 'Fleet Manager',
    image: 'https://cdn.iconscout.com/icon/free/png-512/free-person-icon-download-in-svg-png-gif-file-formats--user-male-young-profile-interface-vol-1-pack-icons-2202553.png?f=webp&w=256',
  },
];

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <h1 className="hero-title">About AutoVoyage</h1>
          <p className="hero-subtitle">
            We're revolutionizing the car rental experience with premium vehicles and exceptional service.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="container">
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <div className="container">
          <h2>Our Team</h2>
          <p className="hero-subtitle">Meet the people behind AutoVoyage</p>

          <div className="team-grid">
            {team.map((member, index) => (
              <div className="team-card" key={index}>
                <div className="member-avatar">
                  <img src={member.image} alt={member.name} />
                </div>
                <h3>{member.name}</h3>
                {/* <p>{member.role}</p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About; 