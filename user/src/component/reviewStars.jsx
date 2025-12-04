export default function ReviewStars({ rating }) {
  const stars = Array.from({ length: 5 }, (_, i) => i < rating);

  return (
    <div className="flex text-yellow-400 text-lg">
      {stars.map((filled, i) =>
        filled ? <span key={i}>★</span> : <span key={i}>☆</span>
      )}
    </div>
  );
}
