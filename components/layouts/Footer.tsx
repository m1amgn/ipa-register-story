import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-600 text-white font-medium py-4">
      <div className="container mx-auto text-center">
        <a href="https://www.story.foundation/" target="_blank" className="text-sm hover:text-gray-300 transition">
          Created by Story Protocol © 2024
        </a>
      </div>
    </footer>
  );
};

export default Footer;
