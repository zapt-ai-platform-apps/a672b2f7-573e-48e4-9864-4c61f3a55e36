function ChangeGoalkeeperButton({ assignGoalkeeper }) {
  return (
    <div class="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md mb-8">
      <button
        class="px-8 py-4 bg-yellow-500 text-white text-lg rounded-lg cursor-pointer hover:bg-yellow-600 hover:scale-105 transition duration-300 ease-in-out"
        onClick={assignGoalkeeper}
      >
        Change Goalkeeper
      </button>
    </div>
  );
}

export default ChangeGoalkeeperButton;