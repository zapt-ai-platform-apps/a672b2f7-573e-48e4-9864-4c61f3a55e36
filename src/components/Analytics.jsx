import { createSignal } from 'solid-js';
import { Bar } from 'solid-chartjs';
import Chart from 'chart.js/auto';

function Analytics(props) {
  const [chartData] = createSignal({
    labels: props.playerData.map((player) => player.name),
    datasets: [
      {
        label: 'Play Time (seconds)',
        data: props.playerData.map((player) => player.totalPlayTime),
        backgroundColor: 'rgba(34, 197, 94, 0.6)', // Tailwind green-500
      },
    ],
  });

  return (
    <div class="p-4">
      <h2 class="text-2xl font-bold mb-4 text-green-600">Player Analytics</h2>
      <Bar
        data={chartData()}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Player Playtime Chart',
            },
          },
        }}
        width={600}
        height={400}
      />
      <button
        class="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
        onClick={props.onClose}
      >
        Back to Game
      </button>
    </div>
  );
}

export default Analytics;