import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function TribeProjectPage() {
  return (
    <>
      <Header />
      <div className="h-full w-full mx-auto max-w-[60.5rem] px-6">
        <main className="flex flex-col w-full min-h-screen h-full pt-24">
        <div className="w-full flex items-center justify-between gap-5 mb-10 max-md:flex-col">
          <h1 className="font-bold text-xl tracking-widest text-white max-sm:mb-4">
            TRIBE - Community App
          </h1>
          <div className="flex items-center gap-3 text-sm text-white max-sm:flex-col max-sm:w-full">
            <Link
              target="_blank"
              href="https://github.com/sohagzayan/tribe-community-app"
              className="flex items-center gap-1 bg-gray-400/10 max-sm:w-full max-sm:justify-center rounded-full py-1 px-6 hover:bg-gray-400/20 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <path d="M5.315 2.1c.791 -.113 1.9 .145 3.333 .966l.272 .161l.16 .1l.397 -.083a13.3 13.3 0 0 1 4.59 -.08l.456 .08l.396 .083l.161 -.1c1.385 -.84 2.487 -1.17 3.322 -1.148l.164 .008l.147 .017l.076 .014l.05 .011l.144 .047a1 1 0 0 1 .53 .514a5.2 5.2 0 0 1 .397 2.91l-.047 .267l-.046 .196l.123 .163c.574 .795 .93 1.728 1.03 2.707l.023 .295l.007 .272c0 3.855 -1.659 5.883 -4.644 6.68l-.245 .061l-.132 .029l.014 .161l.008 .157l.004 .365l-.002 .213l-.003 3.834a1 1 0 0 1 -.883 .993l-.117 .007h-6a1 1 0 0 1 -.993 -.883l-.007 -.117v-.734c-1.818 .26 -3.03 -.424 -4.11 -1.878l-.535 -.766c-.28 -.396 -.455 -.579 -.589 -.644l-.048 -.019a1 1 0 0 1 .564 -1.918c.642 .188 1.074 .568 1.57 1.239l.538 .769c.76 1.079 1.36 1.459 2.609 1.191l.001 -.678l-.018 -.168a5.03 5.03 0 0 1 -.021 -.824l.017 -.185l.019 -.12l-.108 -.024c-2.976 -.71 -4.703 -2.573 -4.875 -6.139l-.01 -.31l-.004 -.292a5.6 5.6 0 0 1 .908 -3.051l.152 -.222l.122 -.163l-.045 -.196a5.2 5.2 0 0 1 .145 -2.642l.1 -.282l.106 -.253a1 1 0 0 1 .529 -.514l.144 -.047l.154 -.03z"></path>
              </svg>
              Github
            </Link>
            <Link
              target="_blank"
              href="https://tribe-community-app.vercel.app/"
              className="flex items-center gap-1 bg-gray-400/10 max-sm:w-full max-sm:justify-center rounded-full py-1 px-6 hover:bg-gray-400/20 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                <path d="M3.6 9h16.8"></path>
                <path d="M3.6 15h16.8"></path>
                <path d="M11.5 3a17 17 0 0 0 0 18"></path>
                <path d="M12.5 3a17 17 0 0 1 0 18"></path>
              </svg>
              Live Demo
            </Link>
            <Link
              target="_blank"
              href="https://www.youtube.com/watch?v=gKtcJ9Fn6KU"
              className="flex items-center gap-1 bg-gray-400/10 max-sm:w-full max-sm:justify-center rounded-full py-1 px-6 hover:bg-gray-400/20 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z"></path>
                <path d="M10 9l5 3l-5 3z"></path>
              </svg>
              Video
            </Link>
          </div>
        </div>

        <p className="text-gray-400">
          <span className="text-white">TRIBE</span> is a community-driven app
          that lets users create and join communities, share posts, engage with
          likes and comments, and chat in real time with other members. Whether
          you're building a new group or joining an existing one,{' '}
          <span className="text-white">TRIBE</span> makes it easy to connect
          and interact with like-minded people.
        </p>

        <h2 className="font-bold text-base mt-16 tracking-widest text-white mb-5 uppercase">
          Tech stack
        </h2>
        <div className="grid grid-cols-4 items-center gap-3 max-sm:grid-cols-3 max-[500px]:grid-cols-2">
          {[
            { name: 'React', bg: 'bg-blue-600/20', text: 'text-blue-300' },
            { name: 'TypeScript', bg: 'bg-blue-500/20', text: 'text-blue-300' },
            { name: 'Tailwind', bg: 'bg-blue-400/20', text: 'text-blue-300' },
            { name: 'Shadcn', bg: 'bg-white/20', text: 'text-white' },
            { name: 'Cypress', bg: 'bg-green-600/20', text: 'text-green-300' },
            { name: 'Pocketbase', bg: 'bg-white/20', text: 'text-white' },
            { name: 'Tanstack Router', bg: 'bg-purple-400/20', text: 'text-purple-300' },
            { name: 'Tanstack Query', bg: 'bg-red-400/20', text: 'text-red-300' },
          ].map((tech) => (
            <div
              key={tech.name}
              className={`flex h-7 items-center justify-center gap-2 px-4 rounded-full ${tech.bg} ${tech.text}`}
            >
              <p className="text-sm whitespace-nowrap">{tech.name}</p>
            </div>
          ))}
        </div>

        <h2 className="font-bold text-base mt-16 tracking-widest text-white mb-5 uppercase">
          Key features
        </h2>
        <ul className="text-gray-400 w-full space-y-2">
          <li>
            🔐 <span className="text-white font-medium">User Authentication</span> — Sign up and log in securely to the app.
          </li>
          <li>
            🌍 <span className="text-white font-medium">Create & Join Communities</span> — Start a new community or join an existing one.
          </li>
          <li>
            💬 <span className="text-white font-medium">Real-Time Chat</span> — Chat with other members in your community.
          </li>
          <li>
            🛠️ <span className="text-white font-medium">User Management</span> — Add or remove members from your community.
          </li>
          <li>
            👤 <span className="text-white font-medium">Profile Settings</span> — Update your profile picture and description anytime.
          </li>
        </ul>

        <h2 className="font-bold text-base mt-16 tracking-widest text-white mb-5 uppercase">
          Project overview
        </h2>
        <div className="flex flex-col w-full gap-4">
          <div className="w-full max-w-[700px] h-full max-h-[400px]">
            <div className="border-2 border-gray-400/50 rounded-xl" style={{ width: '100%', height: '400px' }}>
              <div style={{ width: '100%', height: '100%' }}>
                <iframe
                  frameBorder="0"
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Tribe - Community App Overview (Portfolio project)"
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/gKtcJ9Fn6KU?autoplay=0&mute=0&controls=1&origin=https%3A%2F%2Fwww.sohagdev.com&playsinline=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&widgetid=3&forigin=https%3A%2F%2Fwww.sohagdev.com%2Fprojects%2Ftribe&aoriginsup=1&vf=1"
                  id="widget4"
                ></iframe>
              </div>
            </div>
          </div>
          {[
            'tribe-home.png',
            'tribe-community.png',
            'tribe-post.png',
            'tribe-about.png',
            'tribe-profile.png',
            'tribe-chat.png',
            'tribe-settings.png',
          ].map((image) => (
            <div key={image} className="w-full max-w-[700px]">
              <div className="border-2 border-gray-400/50 rounded-xl overflow-hidden">
                <div className="w-full h-auto bg-gray-800 aspect-square flex items-center justify-center">
                  <div className="text-gray-500 text-sm">Project Image: {image}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
      </div>
    </>
  );
}

