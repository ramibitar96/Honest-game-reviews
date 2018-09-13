export class Review {
  username: string;
  gameID: number;
  review: string;
  rating: number;
}

export function createReview(username: string, gameID: number, review: string, rating: number): Review {
  return {username, gameID, review, rating};
}

