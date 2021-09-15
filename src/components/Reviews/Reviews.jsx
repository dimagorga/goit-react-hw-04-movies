import { useEffect, useState } from "react";
import api from "../../API/TMDA";

export default function Reviews({ id }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (id) {
      api.fetchReviews(id).then(({ data }) => {
        return data.results.map((review) => {
          const info = {
            id: review.id,
            author: review.author,
            content: review.content,
            results: review.total_results,
          };
          return setReviews((prev) => {
            return [...prev, info];
          });
        });
      });
    }
  }, [id]);
  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length !== 0 ? (
        <ul>
          {reviews.map((review) => {
            return (
              <li key={review.id}>
                <h4>Author: {review.author}</h4>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No results</p>
      )}
    </div>
  );
}
