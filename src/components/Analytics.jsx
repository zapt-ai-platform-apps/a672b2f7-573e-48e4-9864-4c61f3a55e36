import { onMount } from 'solid-js';
import { createMemo } from 'solid-js';
import { Bar } from 'solid-chartjs';
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  Colors,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

function Analytics(props) {
  onMount(() => {
    Chart.register(Title, Tooltip, Legend, Colors, BarElement, CategoryScale, LinearScale);
  });

  const chartData = createMemo(() => ({
    labels: props.playerData().map((player) => player.name),
    datasets: [
      {
        label: 'Total Play Time (minutes)',
        data: props.playerData().map((player) => (player.totalPlayTime / 60).toFixed(2)),
        backgroundColor: props.playerData().map((player) =>
          player.isGoalkeeper ? 'rgba(255, 206, 86, 0.6)' : 'rgba(75, 192, 192, 0.6)'
        ),
      },
    ],
  }));

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Player Play Time Analytics',
      },
    },
  };

  return (
    <div
      class={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center ${
        props.show ? 'block' : 'hidden'
      }`}
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl h-full overflow-auto">
        <button
          class="px-4 py-2 bg-red-500 text-white rounded-lg cursor-pointer hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 mb-4"
          onClick={props.onClose}
        >
          Close
        </button>
        <Bar data={chartData()} options={chartOptions} width={500} height={500} />
      </div>
    </div>
  );
}

export default Analytics;