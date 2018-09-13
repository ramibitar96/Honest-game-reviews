import {Review} from '../gamepage/review.model';
export class Game {
  gameID: number;
  gameName: string;
  releaseDate: string;
  gameInfoText: string;
  esrbRating: string;
  boxUrl: string;
  review: Review[];
  youtube: string;
}

