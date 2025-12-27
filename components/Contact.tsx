'use client';

import { useState, useEffect, useRef } from 'react';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Handle form submission here
    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <div
      ref={sectionRef}
      id="contact"
      className={`flex flex-col w-full mt-24 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="max-w-4xl mx-auto w-full">
        <div className="relative p-8 rounded-2xl overflow-hidden backdrop-blur-lg border border-gray-800 bg-black/50">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>

          <div className="relative z-10">
            {/* Terminal window dots */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>

            <div className="font-mono">
              {/* Title */}
              <p className="text-blue-400 mb-2">$ contact --info</p>
              <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Let's Connect</h2>

              {/* Location */}
              <p className="text-purple-400 mb-2">$ location --current</p>
              <div className="flex items-center gap-2 text-gray-300 mb-8">
                <svg
                  className="w-5 h-5 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span>Full Stack Developer</span>
              </div>

              {/* Email */}
              <p className="text-pink-400 mb-2">$ contact --email</p>
              <a
                href="mailto:sohgdev2019@gmail.com"
                className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 text-blue-300 rounded-lg border border-blue-500/20 hover:from-blue-500/20 hover:via-purple-500/20 hover:to-pink-500/20 transition-all mb-8"
              >
                sohgdev2019@gmail.com
              </a>

              {/* Resume Download */}
              <p className="text-purple-400 mt-8 mb-2">$ cat resume.pdf</p>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 text-purple-300 rounded-lg border border-purple-500/20 hover:from-blue-500/20 hover:via-purple-500/20 hover:to-pink-500/20 transition-all mb-8"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"></path>
                </svg>
                <span>Download Resume</span>
              </a>

              {/* Social Links */}
              <p className="text-blue-400 mt-8 mb-4">$ ls ./social-links</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                <a
                  href="https://github.com/sohagzayan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors border border-gray-700/50 group hover:border-blue-500/30"
                >
                  <div className="p-2 bg-gray-700/50 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                    <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-200">GitHub</p>
                    <p className="text-sm text-gray-400">@sohagzayan</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/sohagzayan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors border border-gray-700/50 group hover:border-purple-500/30"
                >
                  <div className="p-2 bg-gray-700/50 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                    <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-200">LinkedIn</p>
                    <p className="text-sm text-gray-400">Sohag Hossain</p>
                  </div>
                </a>

                <a
                  href="https://twitter.com/sohagmia360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-colors border border-gray-700/50 group hover:border-pink-500/30"
                >
                  <div className="p-2 bg-gray-700/50 rounded-lg group-hover:bg-pink-500/20 transition-colors">
                    <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.80l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-200">X</p>
                    <p className="text-sm text-gray-400">@sohagmia360</p>
                  </div>
                </a>
              </div>

              {/* Contact Form */}
              <p className="text-pink-400 mt-8 mb-4">$ send-message</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-mono text-blue-400 mb-2">
                    $ name:
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 font-mono bg-black/20 border border-blue-500/20 rounded-md text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-mono text-purple-400 mb-2">
                    $ email:
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 font-mono bg-black/20 border border-purple-500/20 rounded-md text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-mono text-pink-400 mb-2">
                    $ message:
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 font-mono bg-black/20 border border-pink-500/20 rounded-md text-gray-200 focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 font-mono text-white font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg shadow-purple-500/20"
                >
                  {isSubmitting ? 'Sending...' : 'SendMessage()'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
