'use client';

import { useState, useEffect, useRef } from 'react';

export default function WorkExperience() {
  const [isVisible, setIsVisible] = useState(false);
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

  const experiences = [
    {
      period: '06 May, 2024 - Present',
      title: 'TEAM LEAD / FULL STACK DEVELOPER',
      company: 'REMOTE TALENT LTD.',
      location: 'Dhaka, Bangladesh',
      workMode: 'Onsite (Previously Remote - Canada Branch for 3 months)',
      responsibilities: [
        'Lead a high-performing development team of 4 engineers at a Canadian-based technology company, driving technical excellence and delivering enterprise-grade software solutions',
        'Spearhead full-stack development initiatives using modern technologies including React, Next.js, TypeScript, Node.js, Django, Python, and PostgreSQL',
        'Architect scalable microservices and RESTful APIs, implementing robust authentication, authorization, and data management systems',
        'Manage cloud infrastructure on Digital Ocean, optimizing server performance, implementing CI/CD pipelines, and ensuring high availability and disaster recovery protocols',
        'Conduct comprehensive code reviews, establish coding standards, and implement agile methodologies including Scrum and Kanban',
        'Mentor junior developers through pair programming, technical training sessions, and career development planning',
        'Collaborate with cross-functional teams including product managers, designers, and stakeholders to translate business requirements into technical specifications',
        'Drive sprint planning, backlog grooming, and sprint retrospectives to continuously improve team velocity and product quality',
        'Implement automated testing strategies, performance optimization techniques, and security best practices',
        'Manage project timelines, resource allocation, and technical debt reduction initiatives',
      ],
    },
    {
      period: '16 February, 2023 - 06 May, 2024',
      title: 'SOFTWARE DEVELOPER',
      company: 'IIINIGENCE LLC / CYGENSOLS PVT',
      location: 'USA-based Company, International Team',
      workMode: 'Remote',
      responsibilities: [
        'Developed and maintained full-stack web applications using React, Node.js, JavaScript, and TypeScript, delivering responsive and performant user interfaces',
        'Designed intuitive UI/UX solutions by creating wireframes, prototypes, and high-fidelity mockups using design tools',
        'Implemented RESTful APIs, database schemas, and server-side logic for scalable applications',
        'Collaborated with product managers, UX designers, and backend engineers in agile development environments',
        'Optimized application performance through code refactoring, lazy loading, and efficient state management',
        'Implemented responsive design principles ensuring cross-browser compatibility and mobile-first approaches',
        'Participated in code reviews, sprint planning, and daily standups following Scrum methodologies',
        'Debugged and resolved complex technical issues, improving application stability and user experience',
      ],
    },
  ];

  return (
    <div
      ref={sectionRef}
      id="work-experience"
      className="flex flex-col w-full mt-24"
    >
      <h2
        className={`font-bold text-2xl md:text-3xl text-white mb-12 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        Experience
      </h2>

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div 
          className={`absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-700/50 transform md:-translate-x-1/2 transition-all duration-1000 ease-out ${
            isVisible ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0'
          }`}
          style={{
            transformOrigin: 'top',
            transitionDelay: isVisible ? '200ms' : '0ms',
          }}
        ></div>

        <div className="flex flex-col gap-16">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Timeline Dot */}
              <div 
                className={`absolute left-6 md:left-1/2 w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-2 border-[#0a0a0a] transform md:-translate-x-1/2 -translate-y-1 z-10 transition-all duration-700 ease-out group-hover:scale-125 group-hover:shadow-lg group-hover:shadow-blue-500/50 ${
                  isVisible
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-0'
                }`}
                style={{
                  transitionDelay: isVisible ? `${400 + index * 200}ms` : '0ms',
                }}
              ></div>

              {/* Content Container */}
              <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-12 pl-12 md:pl-0">
                {/* Left Column - Title & Date */}
                <div 
                  className={`md:pr-8 md:text-right transition-all duration-700 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-6'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${500 + index * 200}ms` : '0ms',
                  }}
                >
                  <h3 className="text-base md:text-lg font-bold text-gray-200 uppercase mb-2 tracking-wide">
                    {exp.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-normal">{exp.period}</p>
                </div>

                {/* Right Column - Company & Details */}
                <div 
                  className={`md:pl-8 transition-all duration-700 ease-out ${
                    isVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-6'
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${600 + index * 200}ms` : '0ms',
                  }}
                >
                  <h4 className="text-base md:text-lg font-bold text-gray-200 uppercase mb-2 tracking-wide">
                    {exp.company}
                  </h4>
                  <p 
                    className={`text-sm text-gray-500 mb-1 font-normal transition-all duration-700 ease-out ${
                      isVisible
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-2'
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${700 + index * 200}ms` : '0ms',
                    }}
                  >
                    {exp.location}
                  </p>
                  {exp.workMode && (
                    <p 
                      className={`text-sm text-gray-500/80 mb-4 font-normal italic transition-all duration-700 ease-out ${
                        isVisible
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2'
                      }`}
                      style={{
                        transitionDelay: isVisible ? `${750 + index * 200}ms` : '0ms',
                      }}
                    >
                      {exp.workMode}
                    </p>
                  )}
                  
                  <ul className="space-y-2.5">
                    {exp.responsibilities.map((responsibility, idx) => (
                      <li 
                        key={idx} 
                        className={`flex items-start gap-3 text-gray-400 text-sm leading-relaxed transition-all duration-500 ease-out hover:text-gray-300 ${
                          isVisible
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 translate-x-4'
                        }`}
                        style={{
                          transitionDelay: isVisible ? `${800 + index * 200 + idx * 50}ms` : '0ms',
                        }}
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 transition-all duration-300 group-hover:bg-blue-400"></span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
