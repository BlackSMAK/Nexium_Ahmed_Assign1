'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ThemeToggle } from './components/ThemeToggle';

export default function Home() {
  const [quoteGenerated, setQuoteGenerated] = useState(false);
  const [hasGeneratedOnce, setHasGeneratedOnce] = useState(false);
  const [quoteType, setQuoteType] = useState('motivational');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.getAttribute('data-theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const observer = new MutationObserver(() => {
      const current = document.documentElement.getAttribute('data-theme');
      setTheme(current || 'light');
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setQuoteGenerated(false);

    try {
      if (!hasGeneratedOnce) {
        setHasGeneratedOnce(true);
      }

      // Uncomment the following lines if you want to use a random quote type using a random selection.
      /*const typeToUse =
        quoteType === 'random'
          ? ['motivational', 'funny', 'movies'][Math.floor(Math.random() * 3)]
          : quoteType;
      */
        
      const typeToUse = quoteType;
      const res = await fetch(`/quotes/${typeToUse}.json`);
      const data = await res.json();
      const randomQuote = data[Math.floor(Math.random() * data.length)];

      setQuote(randomQuote.quote);
      setAuthor(randomQuote.author || '');
      setQuoteGenerated(true);
    } catch (error) {
      console.error('Error loading quote:', error);
      setQuote('Failed to load quote.');
      setAuthor('');
      setQuoteGenerated(true);
    } finally {
      setLoading(false);
    }
  };

  const backgroundImage =
    theme === 'synthwave'
      ? "url('/images/bg.jpg')"
      : "url('/images/light_bg.jpg')";

  const textColor = theme === 'synthwave' ? 'text-white' : 'text-white';

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{
        backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-black bg-opacity-50 flex-grow">
        <ThemeToggle />

        <div className="flex flex-col items-center justify-start px-4 pt-24 pb-32 min-h-screen">
          
          <motion.h1
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: hasGeneratedOnce ? -30 : 0,
              opacity: 1,
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`text-5xl font-extrabold ${textColor} mb-8`}
          >
            Quote Generator
          </motion.h1>

          
      <AnimatePresence>
      {!hasGeneratedOnce && (
          <motion.p
        key="intro"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className={`text-lg mb-6 ${textColor}`}
        >
          Minimalistic Quote Generator.
        </motion.p>
          )}
          </AnimatePresence>


          
          <AnimatePresence>
            {quoteGenerated && (
              <motion.div
                key="quote"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className={`text-2xl font-medium max-w-md mb-6 text-center ${textColor}`}
              >
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <>
                    “{quote}”
                    <br />
                    {author && (
                      <span className="text-sm text-gray-300">— {author}</span>
                    )}
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          
          <div className="relative flex flex-col items-end gap-2 mt-4">
            
            <div className="relative group self-end pr-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 text-white opacity-70 hover:opacity-100 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
              </svg>
              <div className="absolute bottom-full right-0 mb-2 w-48 text-sm bg-white text-black p-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                Select the type of quote you'd like before generating.
              </div>
            </div>

            
            <div className="relative flex items-center gap-2">
              
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="p-2 bg-transparent bg-opacity-20 rounded-full hover:bg-opacity-30 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  {dropdownOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 15.75 7.5-7.5 7.5 7.5"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  )}
                </svg>
              </button>

              
              <motion.button
                onClick={handleGenerate}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg"
              >
                Generate 
              </motion.button>

              
              {dropdownOpen && (
                <div className="absolute top-14 left-0 w-44 max-h-48 overflow-y-auto bg-transparent text-white rounded-md shadow-lg z-50 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                  {['motivational', 'funny', 'movies', 'random'].map((type) => (
                    <div
                      key={type}
                      className={`px-4 py-2 cursor-pointer hover:bg-black ${
                        quoteType === type ? 'font-bold text-blue-600' : ''
                      }`}
                      onClick={() => {
                        setQuoteType(type);
                        setDropdownOpen(false);
                      }}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

<motion.footer
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  className={`w-full py-6 text-center mt-auto ${
    theme === 'synthwave'
      ? 'bg-black text-white'
      : 'bg-white text-gray-800'
  }`}
>
  <div className="text-sm mb-2">
    &copy; {new Date().getFullYear()} Personal Quote Generator • Made by Syed Muhammad Ahmed Khalid.
  </div>
  <div className="flex justify-center space-x-4">
    {/* GitHub */}
    <a
      href="https://github.com/BlackSMAK"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-110 transition-transform"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.6-3.9-1.6-.5-1.3-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.9.1-.6.3-1.1.5-1.4-2.5-.3-5.1-1.2-5.1-5.5 0-1.2.4-2.1 1-2.9 0-.2-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.1 9.1 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.1 2.4.1 2.6.6.8 1 1.7 1 2.9 0 4.3-2.6 5.2-5.1 5.5.3.3.6.8.6 1.7v2.5c0 .3.2.7.8.6A10.5 10.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    </a>

    {/* LinkedIn */}
    <a
      href="https://linkedin.com/in/syed-muhammad-ahmed-khalid-6b8611336"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:scale-110 transition-transform"
    >
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M4.98 3.5A2.5 2.5 0 1 1 2.5 6a2.5 2.5 0 0 1 2.48-2.5Zm.02 4H2.5v14h4V7.5Zm7.5 0H10v14h4v-7.5c0-2 2.5-2.2 2.5 0V21h4v-7.8c0-4.2-4.8-4-6.5-2v-3.7Z" />
      </svg>
    </a>
  </div>
  </motion.footer>

    </div>
  );
}
