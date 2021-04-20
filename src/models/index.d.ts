import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class Hand {
  readonly id: string;
  readonly winners?: (Player | null)[];
  readonly game: Game;
  constructor(init: ModelInit<Hand>);
  static copyOf(source: Hand, mutator: (draft: MutableModel<Hand>) => MutableModel<Hand> | void): Hand;
}

export declare class Player {
  readonly id: string;
  readonly name: string;
  readonly handWinnersId?: string;
  constructor(init: ModelInit<Player>);
  static copyOf(source: Player, mutator: (draft: MutableModel<Player>) => MutableModel<Player> | void): Player;
}

export declare class Game {
  readonly id: string;
  readonly date: string;
  constructor(init: ModelInit<Game>);
  static copyOf(source: Game, mutator: (draft: MutableModel<Game>) => MutableModel<Game> | void): Game;
}