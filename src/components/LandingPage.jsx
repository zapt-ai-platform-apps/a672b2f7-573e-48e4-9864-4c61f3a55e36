import { useNavigate } from '@solidjs/router';

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/setup');
  };

  return (
    <div class="h-full flex flex-col items-center justify-center text-gray-800">
      <h1 class="text-5xl font-bold mb-4 text-green-600">Welcome to Football Subs</h1>
      <p class="text-xl mb-8 text-center max-w-xl">
        Football Subs is an app designed to help coaches manage substitutions for kids' football teams, ensuring fair playtime for all.
      </p>
      <button
        class="px-6 py-3 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
        onClick={handleGetStarted}
      >
        Get Started
      </button>
    </div>
  );
}

export default LandingPage;