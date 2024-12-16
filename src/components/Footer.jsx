import { FaSolidGlobe } from 'solid-icons/fa';

function Footer() {
  return (
    <footer class="bg-gray-800 dark:bg-gray-900 text-white py-6 mt-auto">
      <div class="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div class="text-center md:text-left">
          <p class="text-xl font-bold">Football Subs</p>
          <p class="text-sm mt-1">&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>
        <div class="flex items-center space-x-6 mt-4 md:mt-0">
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center space-x-2 hover:text-green-400 transition-colors duration-300 cursor-pointer"
          >
            <FaSolidGlobe size={20} />
            <span>Made on ZAPT</span>
          </a>
          <div class="flex items-center space-x-2">
            <span>footballsubs@zapt.ai</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;