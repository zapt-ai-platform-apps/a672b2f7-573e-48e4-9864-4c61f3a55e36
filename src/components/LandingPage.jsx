import { useNavigate } from '@solidjs/router';

function LandingPage() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/setup');
  };

  return (
    <div class="min-h-screen flex flex-col">
      <div class="relative h-screen flex flex-col">
        <img src="https://images.unsplash.com/photo-1642506538803-294fc3d9fc26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NjQ4Nzh8MHwxfHNlYXJjaHwzfHxLaWRzJTIwcGxheWluZyUyMGZvb3RiYWxsJTIwdGVhbSUyMGluJTIwYWN0aW9ufGVufDB8fHx8MTczMDc2MjA1NXww&ixlib=rb-4.0.3&q=80&w=1080"
          
          alt="Kids playing football"
          data-image-request="Kids playing football team in action"
          class="absolute inset-0 w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black opacity-50"></div>
        <div class="relative z-10 flex flex-col items-center justify-center text-white h-full">
          <img
            src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/a672b2f7-573e-48e4-9864-4c61f3a55e36/a07d10c7-40ae-490b-922a-cffd0ccb2aea.png?width=128&height=128"
            alt="Football Subs Logo"
            class="w-32 h-32 mb-4"
          />
          <h1 class="text-5xl font-bold mb-4">Welcome to Football Subs</h1>
          <p class="text-xl mb-8 text-center max-w-xl">
            Manage substitutions easily and fairly for your kids' football team.
          </p>
          <button
            class="px-6 py-3 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;