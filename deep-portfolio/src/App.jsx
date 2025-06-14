import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, ExternalLink, Code, Award, GraduationCap, User, Send, ChevronDown, Star, Database, Globe } from 'lucide-react';

const SunIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="5" stroke="currentColor" fill="none" />
    <path strokeLinecap="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
);

const MoonIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
  </svg>
);

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'contact'];
    const observers = [];

    sections.forEach(sectionId => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                setActiveSection(sectionId);
              }
            });
          },
          {
            threshold: 0.5,
            rootMargin: '-50px 0px -50px 0px'
          }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setSubmitStatus('Please fill in all fields.');
      setTimeout(() => setSubmitStatus(''), 5000);
      return;
    }


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('Please enter a valid email address.');
      setTimeout(() => setSubmitStatus(''), 5000);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus('');
    
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus(data.message || 'Message received! I\'ll get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus(''), 10000);
      } else {
        setSubmitStatus(data.error || 'Failed to send message. Please try again.');
        setTimeout(() => setSubmitStatus(''), 8000);
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('Network error. Please check if the server is running.');
      setTimeout(() => setSubmitStatus(''), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const skills = {
    'Programming Languages': ['C++', 'C', 'Java', 'Python', 'JavaScript'],
    'Web Development': ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'HTML5', 'CSS3'],
    'Problem Solving': ['Data Structures', 'Algorithms', 'LeetCode (130+ solved)', 'CodeChef (1215 score)'],
    'Soft Skills': ['Presentation', 'Planning', 'Teamwork', 'Active Listening', 'Communication']
  };

  const achievements = [
    { title: 'NPTEL DBMS Certification', badge: 'Topper', icon: <Database className="w-5 h-5" /> },
    { title: 'NPTEL DSA with Java', badge: 'Topper', icon: <Code className="w-5 h-5" /> },
    { title: 'NPTEL Problem Solving with C', badge: 'Certified', icon: <Award className="w-5 h-5" /> },
    { title: 'HackerRank C++', badge: '5-Star', icon: <Star className="w-5 h-5" /> },
    { title: 'HackerRank Java', badge: '5-Star', icon: <Star className="w-5 h-5" /> },
    { title: 'LeetCode Problems', badge: '130+ Solved', icon: <Code className="w-5 h-5" /> },
    { title: 'CodeChef Score', badge: '1215', icon: <Award className="w-5 h-5" /> }
  ];

  const projects = [
    {
      title: 'Netflix Clone Frontend',
      description: 'Designed and developed a Netflix-like user interface using HTML, CSS, and JavaScript with modern responsive design.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
      links: { github: 'https://github.com/deep020206', live: '#' },
      category: 'Frontend'
    },
    {
      title: 'Hospital Queue Management System',
      description: 'MERN Stack solution for SIH Problem - manages OPD queues, bed availability, patient admissions, and inventory management.',
      tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
      links: { github: 'https://github.com/deep020206' },
      category: 'Full Stack'
    }
  ];

  return (
    <div className="min-h-screen bg-background-light dark:bg-background text-gray-900 dark:text-text transition-colors duration-300">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-background-light dark:bg-background shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-primary">Deep Marodiya</div>
            <div className="hidden md:flex space-x-6 items-center">
              {['Home', 'About', 'Skills', 'Projects', 'Achievements', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-3 py-2 rounded-lg transition-colors font-medium ${
                    activeSection === item.toLowerCase()
                      ? 'text-primary bg-primary/10 dark:bg-primary/20'
                      : 'text-gray-900 dark:text-text-muted hover:text-primary dark:hover:text-primary'
                  }`}
                >
                  {item}
                </button>
              ))}
              {/* Dark/Light mode toggle */}
              <button
                onClick={() => setDarkMode((prev) => !prev)}
                className="ml-4 px-3 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-primary/80 transition-colors flex items-center justify-center"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <MoonIcon className="w-5 h-5 text-white" />
                ) : (
                  <SunIcon className="w-5 h-5 text-black" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background text-gray-900 dark:text-white relative overflow-hidden pt-16 md:pt-24">
        <div className="absolute inset-0 bg-black opacity-10 dark:opacity-20"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <img src="/Deep Marodiya.jpeg" alt="Deep Marodiya" className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-primary shadow-lg" style={{ objectPosition: 'top' }} />
            <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in text-gray-900 dark:text-white">Deep Marodiya</h1>
            <p className="text-xl md:text-2xl mb-2 text-gray-700 dark:text-text-muted">Information Technology Student</p>
            <p className="text-lg text-gray-700 dark:text-text-muted mb-8">MERN Stack Developer | Problem Solver | Innovation Enthusiast</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="mailto:deepit5656@gmail.com" className="flex items-center gap-2 bg-primary/20 dark:bg-primary/30 px-6 py-3 rounded-full hover:bg-primary/30 dark:hover:bg-primary/40 transition-all">
              <Mail className="w-5 h-5" />
              <span>deepit5656@gmail.com</span>
            </a>
            <a href="tel:+917069678031" className="flex items-center gap-2 bg-primary/20 dark:bg-primary/30 px-6 py-3 rounded-full hover:bg-primary/30 dark:hover:bg-primary/40 transition-all">
              <Phone className="w-5 h-5" />
              <span>+91-7069678031</span>
            </a>
            <div className="flex items-center gap-2 bg-primary/20 dark:bg-primary/30 px-6 py-3 rounded-full">
              <MapPin className="w-5 h-5" />
              <span>Morbi, Gujarat</span>
            </div>
          </div>

          <div className="flex justify-center gap-6 mb-12">
            <a href="https://github.com/deep020206" className="bg-primary/20 dark:bg-primary/30 p-4 rounded-full hover:bg-primary/30 dark:hover:bg-primary/40 transition-all hover:scale-110">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/deep-marodiya/" className="bg-primary/20 dark:bg-primary/30 p-4 rounded-full hover:bg-primary/30 dark:hover:bg-primary/40 transition-all hover:scale-110" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="/Deep_Marodiya_CV.pdf"
              download
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold shadow-lg border-2 border-primary bg-primary text-white transition-all duration-200 dark:bg-primary dark:text-white dark:border-primary hover:bg-transparent hover:text-primary hover:border-primary dark:hover:bg-black dark:hover:text-primary dark:hover:border-primary"
              aria-label="Download CV"
              style={{ minWidth: 180, justifyContent: 'center' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5 5m0 0l5-5m-5 5V4" />
              </svg>
              Download CV
            </a>
          </div>

          <button
            onClick={() => scrollToSection('about')}
            className="animate-bounce"
          >
            <ChevronDown className="w-8 h-8" />
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background-light dark:bg-background text-gray-900 dark:text-text">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-text mb-4">About Me</h2>
            <div className="w-20 h-1 mx-auto rounded-full bg-primary"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-text">Profile</h3>
              <p className="text-gray-600 dark:text-text-muted leading-relaxed mb-6">
                Motivated and detail-oriented Information Technology student with a strong academic background and keen interest in software development. Proficient in front-end technologies and MERN stack development with a solid foundation in programming concepts and database management systems.
              </p>
              <p className="text-gray-600 dark:text-text-muted leading-relaxed">
                Actively seeking opportunities to apply and develop technical, analytical, and problem-solving skills in a collaborative, growth-oriented environment.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-background-light dark:bg-background p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <GraduationCap className="w-6 h-6 text-primary mr-3" />
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-text">Education</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-text">B.Tech Information Technology</h5>
                    <p className="text-gray-600 dark:text-text-muted">CHARUSAT, Anand • 2023-Present</p>
                    <p className="text-primary font-semibold">CGPA: 9.69/10.0</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-text">Higher Secondary (GHSEB)</h5>
                    <p className="text-gray-600 dark:text-text-muted">2023 • 93.55% • GUJCET: 95.38%</p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 dark:text-text">Secondary (GSEB)</h5>
                    <p className="text-gray-600 dark:text-text-muted">2021 • 99.07%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-background-light dark:bg-background text-gray-900 dark:text-text">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-text mb-4">Technical Skills</h2>
            <div className="w-20 h-1 mx-auto rounded-full bg-primary"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-background-light dark:bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {category === 'Programming Languages' && <Code className="w-6 h-6 text-primary mr-3" />}
                  {category === 'Web Development' && <Globe className="w-6 h-6 text-primary mr-3" />}
                  {category === 'Problem Solving' && <Award className="w-6 h-6 text-primary mr-3" />}
                  {category === 'Soft Skills' && <User className="w-6 h-6 text-primary mr-3" />}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-text">{category}</h3>
                </div>
                <ul className="space-y-2">
                  {skillList.map((skill, index) => (
                    <li key={index} className="text-gray-600 dark:text-text-muted flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-background-light dark:bg-background text-gray-900 dark:text-text">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-text mb-4">Projects</h2>
            <div className="w-20 h-1 mx-auto rounded-full bg-primary"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-background-light dark:bg-background rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-text">{project.title}</h3>
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-text-muted mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-background-light dark:bg-background text-gray-700 dark:text-text rounded-full text-sm border">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    {project.links.github && (
                      <a href={project.links.github} className="flex items-center gap-2 text-gray-700 dark:text-text hover:text-primary dark:hover:text-primary transition-colors">
                        <Github className="w-5 h-5" />
                        <span>Code</span>
                      </a>
                    )}
                    {project.links.live && (
                      <a href={project.links.live} className="flex items-center gap-2 text-gray-700 dark:text-text hover:text-primary dark:hover:text-primary transition-colors">
                        <ExternalLink className="w-5 h-5" />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 bg-background-light dark:bg-background text-gray-900 dark:text-text">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-text mb-4">Achievements</h2>
            <div className="w-20 h-1 mx-auto rounded-full bg-primary"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-background-light dark:bg-background p-6 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full mr-4">
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-text">{achievement.title}</h3>
                    <span className="text-primary font-medium">{achievement.badge}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-background-light dark:bg-background text-gray-900 dark:text-text">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-text mb-4">Get In Touch</h2>
            <div className="w-20 h-1 mx-auto rounded-full bg-primary mb-6"></div>
            <p className="text-gray-600 dark:text-text-muted max-w-2xl mx-auto">
              I'm always open to discussing new opportunities, interesting projects, or just having a conversation about technology.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-text">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-text">Email</p>
                    <a href="mailto:deepit5656@gmail.com" className="text-primary hover:underline">
                      deepit5656@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-text">Phone</p>
                    <a href="tel:+917069678031" className="text-primary hover:underline">
                      +91-7069678031
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-primary mr-4" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-text">Location</p>
                    <p className="text-gray-600 dark:text-text-muted">Morbi, Gujarat, India</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-text">Send a Message</h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 dark:text-text-muted font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background-light dark:bg-background text-gray-900 dark:text-text"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-text-muted font-medium mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background-light dark:bg-background text-gray-900 dark:text-text"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-text-muted font-medium mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows="5"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background-light dark:bg-background text-gray-900 dark:text-text resize-vertical"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/80 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
                {submitStatus && (
                  <div className={`p-4 rounded-lg text-center font-medium ${
                    submitStatus.includes('successfully') 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 border border-green-200 dark:border-green-800' 
                      : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-800'
                  }`}>
                    {submitStatus}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background text-white py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://github.com/deep020206" className="hover:text-primary transition-colors">
              <Github className="w-6 h-6" />
            </a>
            <button type="button" className="hover:text-primary transition-colors">
              <Linkedin className="w-6 h-6" />
            </button>
            <a href="mailto:deepit5656@gmail.com" className="hover:text-primary transition-colors">
              <Mail className="w-6 h-6" />
            </a>
          </div>
          <p className="text-text-muted">
            © 2025 Deep Marodiya. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
