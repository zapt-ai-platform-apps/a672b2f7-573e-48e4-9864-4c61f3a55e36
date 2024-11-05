import { useNavigate } from '@solidjs/router';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div class="min-h-screen bg-gradient-to-br from-green-100 to-blue-100 flex flex-col items-center justify-center p-4">
      <img
        src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=256&height=256"
        alt="Football Subs Logo"
        class="w-32 h-32 mb-6"
      />
      <h1 class="text-5xl font-bold text-green-700 mb-6">Football Subs</h1>
      <p class="text-lg text-gray-700 mb-8 text-center">
        Manage your team's substitutions effortlessly and ensure fair playtime for all players.
      </p>
      <button
        class="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        onClick={() => navigate('/setup')}
      >
        Get Started
      </button>
    </div>
  );
}

export default LandingPage;