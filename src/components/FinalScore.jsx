function FinalScore(props) {
  const { ourScore, opponentScore } = props;

  return (
    <div class="mb-8">
      <h2 class="text-2xl font-bold mb-4 text-green-600 dark:text-green-400">Final Score</h2>
      <p class="text-xl">
        Our Team {ourScore()} - {opponentScore()} Opponent Team
      </p>
    </div>
  );
}

export default FinalScore;