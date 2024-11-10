import { useNavigate } from '@solidjs/router';
import Footer from './Footer';

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/setup');
  };

  return (
    <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-green-100 to-blue-100 p-4">
      <img src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHw1fHxBJTIwZm9vdGJhbGwlMjBpY29uJTIwd2l0aCUyMHN1YnN0aXR1dGlvbnMlMjBhcnJvd3N8ZW58MHx8fHwxNzMxMjYwMDIwfDA&ixlib=rb-4.0.3&q=80&w=1080"
        
        alt="Football Subs Logo"
        class="w-32 h-32 mb-6"
        data-image-request="A football icon with substitutions arrows"
      />
      <h1 class="text-5xl font-bold text-green-600 mb-4">Football Subs</h1>
      <p class="text-lg text-gray-700 mb-8 text-center max-w-xl">
        Manage your team's substitutions effortlessly and ensure fair playtime
        for all players.
      </p>
      <button
        class="px-8 py-4 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 text-xl cursor-pointer"
        onClick={handleGetStarted}
      >
        Get Started
      </button>
      <Footer />
    </div>
  );
}

export default LandingPage;