import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Github, Linkedin, Twitter, Mail, ExternalLink, Code2, Terminal, Cpu, PenTool, Database } from 'lucide-react';

import { INITIAL_DATA } from './constants';
import { PortfolioData, Project, Skill } from './types';
import Background from './components/Background';
import Editor from './components/Editor';
import TiltCard from './components/TiltCard';

// -----------------------------------------------------------------------------
// Component: App
// -----------------------------------------------------------------------------

function App() {
  const [data, setData] = useState<PortfolioData>(INITIAL_DATA);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('portfolio_data');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('portfolio_data', JSON.stringify(data));
    
    // Update CSS variables for dynamic theming
    const root = document.documentElement;
    root.style.setProperty('--primary', data.theme.primaryColor);
  }, [data]);

  const navItems = ['Home', 'About', 'Projects', 'Contact'];

  // --- Render Helpers ---

  const renderSocialIcon = (platform: string) => {
    switch(platform) {
      case 'github': return <Github size={20} />;
      case 'linkedin': return <Linkedin size={20} />;
      case 'twitter': return <Twitter size={20} />;
      default: return <Mail size={20} />;
    }
  };

  const renderSkillIcon = (category: string) => {
    switch(category) {
      case 'frontend': return <Code2 className="text-blue-400" />;
      case 'backend': return <Terminal className="text-green-400" />;
      case 'tools': return <Database className="text-yellow-400" />;
      default: return <Cpu className="text-purple-400" />;
    }
  };

  return (
    <div 
      className="min-h-screen relative text-gray-100 font-sans selection:bg-blue-500/30"
      style={{ backgroundColor: data.theme.backgroundColor }}
    >
      <Background color={data.theme.primaryColor} />

      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 right-0 z-40 px-6 py-4 backdrop-blur-md bg-opacity-80 border-b border-white/5 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="font-mono font-bold text-xl tracking-tighter"
        >
          {`<${data.hero.name.split(' ')[0]} />`}
        </motion.div>

        <div className="hidden md:flex gap-8">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => {
                setActiveSection(item.toLowerCase());
                document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`text-sm font-medium hover:text-[color:var(--primary)] transition-colors ${activeSection === item.toLowerCase() ? 'text-[color:var(--primary)]' : 'text-gray-400'}`}
              style={{ '--primary': data.theme.primaryColor } as React.CSSProperties}
            >
              {item}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setIsEditorOpen(true)}
          className="p-2 rounded-full hover:bg-white/10 transition-colors z-50 group relative"
        >
          <Settings size={20} />
          <span className="absolute right-0 top-full mt-2 w-max px-2 py-1 bg-black text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Edit Portfolio
          </span>
        </button>
      </nav>

      {/* --- Main Content --- */}
      <main className="relative z-10 container mx-auto px-6 pt-24 pb-12 space-y-32">
        
        {/* HERO SECTION */}
        <section id="home" className="min-h-[85vh] flex flex-col md:flex-row items-center justify-center gap-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 space-y-6 text-center md:text-left"
          >
            <div 
              className="inline-block px-3 py-1 rounded-full text-sm font-mono border border-white/10 bg-white/5 text-[color:var(--primary)]"
              style={{ '--primary': data.theme.primaryColor } as React.CSSProperties}
            >
              {data.hero.title}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              {data.hero.tagline.split(' ').map((word, i) => (
                <span key={i} className="inline-block mr-3">
                  {word}
                </span>
              ))}
            </h1>
            <p className="text-xl text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed">
              {data.hero.description}
            </p>
            
            <div className="flex gap-4 justify-center md:justify-start pt-4">
              {data.socials.map((social) => (
                <a 
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:scale-110 hover:border-[color:var(--primary)] transition-all duration-300"
                  style={{ '--primary': data.theme.primaryColor } as React.CSSProperties}
                >
                  {renderSocialIcon(social.platform)}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex-1 flex justify-center"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div 
                className="absolute inset-0 rounded-full blur-3xl opacity-20 animate-pulse" 
                style={{ backgroundColor: data.theme.primaryColor }}
              />
              <img 
                src={data.hero.avatarUrl} 
                alt="Profile" 
                className="relative w-full h-full object-cover rounded-3xl rotate-3 border-4 border-white/10 shadow-2xl z-10 hover:rotate-0 transition-transform duration-500"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent rounded-full backdrop-blur-md z-20 border border-white/10 flex items-center justify-center">
                 <Code2 size={32} style={{ color: data.theme.primaryColor }} />
              </div>
            </div>
          </motion.div>
        </section>

        {/* ABOUT & SKILLS */}
        <section id="about" className="grid md:grid-cols-2 gap-16">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <span className="w-8 h-1 bg-[color:var(--primary)] rounded-full" style={{ '--primary': data.theme.primaryColor } as React.CSSProperties} />
              About Me
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              {data.about.bio}
            </p>
            
            <div className="pt-8">
              <h3 className="text-xl font-semibold mb-6">Experience</h3>
              <div className="space-y-8 border-l-2 border-white/10 ml-3 pl-8 relative">
                {data.experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <span 
                      className="absolute -left-[39px] top-1 w-5 h-5 rounded-full border-4 border-[color:var(--bg)] bg-[color:var(--primary)]"
                      style={{ '--bg': data.theme.backgroundColor, '--primary': data.theme.primaryColor } as React.CSSProperties}
                    />
                    <div className="text-sm text-[color:var(--primary)] font-mono mb-1" style={{ '--primary': data.theme.primaryColor } as React.CSSProperties}>
                      {exp.period}
                    </div>
                    <h4 className="text-lg font-bold">{exp.role}</h4>
                    <div className="text-gray-400 text-sm mb-2">{exp.company}</div>
                    <p className="text-gray-500">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold flex items-center gap-3 mb-8">
              <span className="w-8 h-1 bg-[color:var(--primary)] rounded-full" style={{ '--primary': data.theme.primaryColor } as React.CSSProperties} />
              Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.about.skills.map((skill, idx) => (
                <motion.div 
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-4 hover:border-[color:var(--primary)] hover:bg-white/10 transition-colors"
                  style={{ '--primary': data.theme.primaryColor } as React.CSSProperties}
                >
                  <div className="p-3 bg-black/30 rounded-lg">
                    {renderSkillIcon(skill.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-xs text-gray-500 font-mono">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-black/40 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: data.theme.primaryColor }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((project) => (
              <TiltCard key={project.id} className="h-full">
                <div className="group h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[color:var(--primary)] transition-colors duration-300 flex flex-col"
                     style={{ '--primary': data.theme.primaryColor } as React.CSSProperties}>
                  
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                      {project.repoUrl && (
                        <a href={project.repoUrl} target="_blank" rel="noreferrer" className="p-2 bg-black/70 backdrop-blur rounded-full hover:bg-[color:var(--primary)] transition-colors">
                          <Github size={16} />
                        </a>
                      )}
                      {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noreferrer" className="p-2 bg-black/70 backdrop-blur rounded-full hover:bg-[color:var(--primary)] transition-colors">
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-[color:var(--primary)] transition-colors">{project.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 flex-1 line-clamp-3">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* CONTACT & FOOTER */}
        <section id="contact" className="py-20 text-center relative overflow-hidden rounded-3xl bg-gradient-to-b from-white/5 to-transparent border border-white/10">
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[color:var(--primary)] to-transparent opacity-50" 
            style={{ '--primary': data.theme.primaryColor } as React.CSSProperties}
          />
          
          <h2 className="text-4xl font-bold mb-6">Let's work together</h2>
          <p className="text-gray-400 max-w-lg mx-auto mb-10">
            Have a project in mind? I'm always open to discussing new opportunities and innovative ideas.
          </p>

          <a 
            href={`mailto:${data.socials.find(s => s.platform === 'email')?.url.replace('mailto:', '')}`}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[color:var(--primary)] text-white font-bold hover:brightness-110 hover:scale-105 transition-all shadow-lg shadow-[color:var(--primary)]/20"
            style={{ '--primary': data.theme.primaryColor } as React.CSSProperties}
          >
            <Mail size={20} />
            Say Hello
          </a>

          <footer className="mt-20 text-sm text-gray-500">
            <p>© {new Date().getFullYear()} {data.hero.name}. All rights reserved.</p>
            <p className="mt-2 text-xs">Built with React, Tailwind & Framer Motion</p>
          </footer>
        </section>

      </main>

      {/* Editor Drawer */}
      <Editor 
        isOpen={isEditorOpen} 
        onClose={() => setIsEditorOpen(false)} 
        data={data}
        onChange={setData}
      />
    </div>
  );
}

export default App;