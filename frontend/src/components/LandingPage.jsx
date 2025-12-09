import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Link2, 
  PieChart, 
  ShieldCheck, 
  CloudUpload, 
  Search, 
  Rocket, 
  Coins,
  Menu,
  X,
  ArrowRight,
  Github,
  Twitter,
  Zap,
  LogOut
} from 'lucide-react';

// Utility function for animated counters
const useCounter = (end, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    
    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, shouldStart]);

  return count;
};

// Format number with K/M suffix
const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

const LandingPage = ({ onLaunchApp, user, onSignOut }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.getElementById('stats-section');
      if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setStatsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const assetsCount = useCounter(1247, 2000, statsVisible);
  const tvlCount = useCounter(45, 2000, statsVisible);
  const usersCount = useCounter(3890, 2000, statsVisible);
  const contractsCount = useCounter(892, 2000, statsVisible);

  return (
    <div className="min-h-screen bg-deep-space text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="top-0 left-0 right-0 z-50 glass-card border-subtle-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-laser-blue to-electric-cyan rounded-lg flex items-center justify-center">
                <Zap size={20} className="text-white" />
              </div>
              <span className="heading-sm text-white">RWA Platform</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="body-base text-white/70 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="body-base text-white/70 hover:text-white transition-colors">How it Works</a>
              <a href="#technology" className="body-base text-white/70 hover:text-white transition-colors">Technology</a>
              {user && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {user.photoURL && (
                      <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full" />
                    )}
                    <span className="body-sm text-white/70">{user.displayName}</span>
                  </div>
                  <button 
                    onClick={onSignOut}
                    className="px-4 py-2 glass-card rounded-lg body-sm font-semibold hover:bg-white/5 transition-colors flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              )}
              <button 
                onClick={onLaunchApp}
                className="px-6 py-2 bg-gradient-to-r from-laser-blue to-electric-cyan rounded-lg body-base font-semibold hover:opacity-90 transition-opacity"
              >
                Launch App
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-card border-t border-subtle-border">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block body-base text-white/70 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="block body-base text-white/70 hover:text-white transition-colors">How it Works</a>
              <a href="#technology" className="block body-base text-white/70 hover:text-white transition-colors">Technology</a>
              {user && (
                <>
                  <div className="flex items-center gap-2 py-2">
                    {user.photoURL && (
                      <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full" />
                    )}
                    <span className="body-sm text-white/70">{user.displayName}</span>
                  </div>
                  <button 
                    onClick={onSignOut}
                    className="w-full px-4 py-2 glass-card rounded-lg body-sm font-semibold hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </>
              )}
              <button 
                onClick={onLaunchApp}
                className="w-full px-6 py-2 bg-gradient-to-r from-laser-blue to-electric-cyan rounded-lg body-base font-semibold"
              >
                Launch App
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-space via-dark-surface to-deep-space">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-laser-blue rounded-full blur-[120px] animate-float"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-electric-cyan rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }}></div>
          </div>
          
          {/* Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up max-w-5xl mx-auto">
            {/* Main Heading */}
            <h1 className="mb-6 px-4">
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>
                Transform <span className="gradient-text">Real-World</span>
              </span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>
                <span className="gradient-text">Assets</span> into Digital Tokens
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-3xl mx-auto leading-relaxed px-4" style={{ fontFamily: "'Source Sans 3', sans-serif", fontWeight: 300 }}>
              Unlock liquidity through AI-powered asset scoring and blockchain tokenization. 
              <span className="block mt-1">Enable fractional ownership of high-value assets in minutes.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
              <button 
                onClick={onLaunchApp}
                className="px-8 py-4 bg-gradient-to-r from-laser-blue to-electric-cyan rounded-xl text-base font-semibold hover:shadow-lg hover:shadow-laser-blue/25 transition-all duration-300 flex items-center gap-2 group transform hover:scale-105"
              >
                Launch App
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="mt-16 relative">
            <div className="glass-card p-8 max-w-4xl mx-auto">
              <img 
                src="/hero-network.svg" 
                alt="Blockchain Network" 
                className="w-full h-auto opacity-80"
                style={{ filter: 'drop-shadow(0 0 40px rgba(0, 89, 207, 0.3))' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Powerful Features</h2>
            <p className="body-lg text-white/70 max-w-2xl mx-auto">
              Everything you need to tokenize and manage real-world assets on the blockchain
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <BrainCircuit size={32} className="text-laser-blue" />,
                title: 'AI-Powered Scoring',
                description: 'Get instant, intelligent asset valuations using advanced machine learning algorithms'
              },
              {
                icon: <Link2 size={32} className="text-electric-cyan" />,
                title: 'Blockchain Tokenization',
                description: 'Deploy secure smart contracts on Mantle Network for fractional ownership'
              },
              {
                icon: <PieChart size={32} className="text-neon-yellow" />,
                title: 'Fractional Ownership',
                description: 'Enable multiple investors to own portions of high-value assets'
              },
              {
                icon: <ShieldCheck size={32} className="text-laser-blue" />,
                title: 'Secure & Transparent',
                description: 'Immutable blockchain records ensure trust and transparency'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-6 hover:bg-white/5 transition-all duration-300 group cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4 transform group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="heading-sm mb-3">{feature.title}</h3>
                <p className="body-base text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 relative bg-gradient-to-b from-transparent via-dark-surface/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">How It Works</h2>
            <p className="body-lg text-white/70 max-w-2xl mx-auto">
              Four simple steps to tokenize your real-world assets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: '01',
                icon: <CloudUpload size={40} className="text-laser-blue" />,
                title: 'Upload Asset',
                description: 'Submit your asset documents (images, PDFs) for analysis'
              },
              {
                number: '02',
                icon: <Search size={40} className="text-electric-cyan" />,
                title: 'AI Analysis',
                description: 'Our ML model evaluates and scores your asset based on multiple criteria'
              },
              {
                number: '03',
                icon: <Rocket size={40} className="text-neon-yellow" />,
                title: 'Deploy Contract',
                description: 'Smart contracts are deployed to Mantle blockchain with one click'
              },
              {
                number: '04',
                icon: <Coins size={40} className="text-laser-blue" />,
                title: 'Create Tokens',
                description: 'Fractional tokens are minted, enabling distributed ownership'
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                {/* Connecting Line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-laser-blue/50 to-transparent"></div>
                )}
                
                <div className="glass-card p-6 text-center hover:bg-white/5 transition-all duration-300">
                  <div className="text-6xl font-bold text-white/5 mb-4">{step.number}</div>
                  <div className="flex justify-center mb-4">
                    {step.icon}
                  </div>
                  <h3 className="heading-sm mb-3">{step.title}</h3>
                  <p className="body-sm text-white/70">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Trusted by Innovators</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { value: assetsCount, label: 'Assets Tokenized', suffix: '' },
              { value: tvlCount, label: 'Total Value Locked', suffix: 'M' },
              { value: usersCount, label: 'Active Users', suffix: '' },
              { value: contractsCount, label: 'Smart Contracts', suffix: '' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="heading-xl gradient-text mb-2">
                  {formatNumber(stat.value)}{stat.suffix}
                </div>
                <div className="body-base text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-24 relative bg-gradient-to-b from-transparent via-dark-surface/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Built on Cutting-Edge Technology</h2>
            <p className="body-lg text-white/70 max-w-2xl mx-auto">
              Leveraging the best tools and platforms in the blockchain ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Mantle Network',
                description: 'Layer-2 scaling solution for efficient transactions',
                icon: <Link2 size={24} />
              },
              {
                name: 'AI/ML Scoring',
                description: 'Advanced algorithms for accurate asset valuation',
                icon: <BrainCircuit size={24} />
              },
              {
                name: 'Smart Contracts',
                description: 'Audited and secure contract templates',
                icon: <ShieldCheck size={24} />
              },
              {
                name: 'IPFS Storage',
                description: 'Decentralized storage for asset metadata',
                icon: <Zap size={24} />
              }
            ].map((tech, index) => (
              <div 
                key={index}
                className="glass-card p-6 hover:bg-white/5 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-laser-blue/20 to-electric-cyan/20 rounded-lg flex items-center justify-center mb-4 text-laser-blue group-hover:scale-110 transition-transform">
                  {tech.icon}
                </div>
                <h3 className="heading-sm mb-2">{tech.name}</h3>
                <p className="body-sm text-white/70">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-card p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-laser-blue/10 to-electric-cyan/10"></div>
            
            <div className="relative z-10">
              <h2 className="heading-lg mb-4">Ready to Tokenize Your Assets?</h2>
              <p className="body-lg text-white/70 mb-8 max-w-2xl mx-auto">
                Join the future of asset ownership. Start tokenizing real-world assets in minutes.
              </p>

              <div className="flex justify-center">
                <button 
                  onClick={onLaunchApp}
                  className="px-8 py-4 bg-gradient-to-r from-laser-blue to-electric-cyan rounded-lg body-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 justify-center group"
                >
                  Get Started Now
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-subtle-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="heading-sm mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="body-sm text-white/70 hover:text-white transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="body-sm text-white/70 hover:text-white transition-colors">How it Works</a></li>
                <li><a href="#" className="body-sm text-white/70 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="body-sm text-white/70 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

            <div>
              <h4 className="heading-sm mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="body-sm text-white/70 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="body-sm text-white/70 hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="body-sm text-white/70 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="body-sm text-white/70 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="heading-sm mb-4">Community</h4>
              <ul className="space-y-2">
                <li><a href="#" className="body-sm text-white/70 hover:text-white transition-colors flex items-center gap-2"><Github size={16} /> GitHub</a></li>
                <li><a href="#" className="body-sm text-white/70 hover:text-white transition-colors flex items-center gap-2"><Twitter size={16} /> Twitter</a></li>
                <li><a href="#" className="body-sm text-white/70 hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="body-sm text-white/70 hover:text-white transition-colors">Telegram</a></li>
              </ul>
            </div>

            <div>
              <h4 className="heading-sm mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="body-sm text-white/70 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="body-sm text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="body-sm text-white/70 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-subtle-border pt-8 flex flex-col md:flex-row justify-center items-center gap-4">
            <div className="body-sm text-white/50">
              © 2024 RWA Tokenization Platform. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;