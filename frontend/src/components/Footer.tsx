import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8 fixed right-0 left-0 bottom-0">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <p className="text-xs sm:text-sm">
              Open Source - Created for the love of automation on the iPhone. 
            </p>
          </div>

          <div >

            <a 
              href="https://github.com/arnavnotfound"
              target="_blank"
              rel="noopener noreferrer"
              className=" flex flex-row gap-2"
              
            >
              Contribute <img src='src/assets/github.png' width='20px'/>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
