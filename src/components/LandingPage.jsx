import { useNavigate } from '@solidjs/router';

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/setup');
  };

  return (
    <div class="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <div class="flex-grow flex flex-col justify-center items-center bg-gradient-to-br from-green-100 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-8">
        <img
          src="https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHwxfHxBJTIwZm9vdGJhbGwlMjBpY29uJTIwd2l0aCUyMHN1YnN0aXR1dGlvbnMlMjBhcnJvd3N8ZW58MHx8fHwxNzMxMDE4MjY2fDA&ixlib=rb-4.0.3&q=80&w=1080"
          alt="Football Subs Logo"
          class="w-32 h-32 mb-8"
          data-image-request="A football icon with substitutions arrows"
        />
        <h1 class="text-5xl font-bold text-green-600 mb-8 text-center md:text-left">Football Subs</h1>
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center max-w-xl">
          Manage your team's substitutions effortlessly and ensure fair playtime for all players.
        </p>
        <button
          class="px-12 py-6 bg-green-500 text-white text-2xl rounded-lg cursor-pointer hover:bg-green-600 hover:scale-105 transition duration-300 ease-in-out"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default LandingPage;