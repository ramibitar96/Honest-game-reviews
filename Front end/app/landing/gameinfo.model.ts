export class GameInfo {
  code: number;
  status: string;
  data: Data;
  include: Include;
  pages: Page;
}

class Data {
  count: number;
  games: Game[];
}

class Game {
  id: number;
  game_title: string;
  release_date: string;
  platform: number;
  developers: number[];
  overview: string;
  rating: string;
  youtube: string;
}

class Include {
  boxart: Boxart;
}

class Boxart {
  base_url: Base;
  data: any;
}


class Page {
  previous: string;
  current: string;
  next: string;
}

class Base {
  original: string;
  small: string;
  thumb: string;
  cropped_center_thumb: string;
  medium: string;
  large: string;
}
