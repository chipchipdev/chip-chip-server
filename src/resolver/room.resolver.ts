import { PubSub } from 'graphql-subscriptions';
import { MutationCreateRoomArgs, Room } from '../type';

const pubsub = new PubSub();

export const roomResolver = {
  Subscription: {
    roomCreated: {
      subscribe: () => pubsub.asyncIterator(['ROOM_CREATED']),
    },
  },
  Mutation: {
    async createRoom(_, { id }: MutationCreateRoomArgs) {
      const room = { id, owner: { id }, participants: [] } as Room;
      await pubsub.publish('ROOM_CREATED', room);
      return room;
    },
  },
};
