"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa"; // Icons
import { MdOutlineWeb } from "react-icons/md"; // Web icon for Portfolio

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400 py-6 text-center">
      <p className="text-md pb-4">
        Made with ❤️ by <span className="text-white font-semibold">Nimish Kumar</span>
      </p>
      <div className="flex justify-center gap-4 mt-2">
        {/* GitHub */}
        <a
          href="https://github.com/NimishKr16"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition duration-300"
        >
          <FaGithub className="w-6 h-6" />
        </a>
        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/nimish-kumar16"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition duration-300"
        >
          <FaLinkedin className="w-6 h-6" />
        </a>
        {/* Portfolio */}
        <a
          href="https://nimishkumar.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition duration-300"
        >
          <MdOutlineWeb className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;