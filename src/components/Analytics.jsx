import { onMount } from 'solid-js';
import { Bar } from 'solid-chartjs';
import Chart from 'chart.js/auto';

function Analytics({ playerData, onClose }) {
  let chartData = {
    labels: playerData.map((player) => player.name),
    datasets: [
      {
        label: 'Playing Time (seconds)',
        data: playerData.map((player) => player.totalPlayTime),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 class="text-2xl font-bold mb-4 text-green-600">Player Analytics</h2>
        <Bar data={chartData} width={400} height={200} />
        <button
          class="mt-4 w-full py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Analytics;