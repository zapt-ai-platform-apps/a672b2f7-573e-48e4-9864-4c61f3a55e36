import ThemeToggle from './ThemeToggle';

function NavBar() {
  return (
    <nav class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <img
            src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=32&height=32"
            alt="Football Subs Logo"
            class="w-8 h-8"
          />
          <span class="text-2xl font-bold text-gray-800 dark:text-white">Football Subs</span>
        </div>
        <div class="flex items-center space-x-4">
          <a
            href="https://www.zapt.ai"
            target="_blank"
            rel="noopener noreferrer"
            class="text-gray-800 dark:text-white hover:underline cursor-pointer"
          >
            Made on ZAPT
          </a>
          <a
            href="mailto:footballsubs@zapt.ai"
            class="text-gray-800 dark:text-white hover:underline cursor-pointer"
          >
            Contact Us
          </a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;