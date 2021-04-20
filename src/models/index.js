// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Hand, Player, Game } = initSchema(schema);

export {
  Hand,
  Player,
  Game
};