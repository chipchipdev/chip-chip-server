import { PubSub, withFilter } from 'graphql-subscriptions';
import { ApolloError } from 'apollo-server-express';
import { randomUUID } from 'crypto';
import {
  MutationAnswerToArgs,
  MutationCandidateToArgs, MutationCreateRoomArgs,
  MutationJoinRoomArgs,
  MutationOfferToArgs, MutationUpdateConnectionStageArgs,
  Participant,
  ParticipantAnswer,
  ParticipantCandidate,
  ParticipantConnectionStage,
  ParticipantOffer,
  Resolvers,
  Room,
  SubscriptionAnswerSentArgs,
  SubscriptionCandidateSentArgs,
  SubscriptionOfferSentArgs,
  SubscriptionRoomJoinedArgs,
} from '../type';

enum RoomEventEnum {
  ROOM_JOINED = 'ROOM_JOINED',
  OFFER_SENT = 'OFFER_SENT',
  ANSWER_SENT = 'ANSWER_SENT',
  CANDIDATE_SENT = 'CANDIDATE_SENT',
  CONNECTION_STAGE_UPDATED = 'CONNECTION_STAGE_UPDATED',
}

const pubsub = new PubSub();
const rooms: Room[] = [];

export const roomResolver: Resolvers = {
  Subscription: {
    roomJoined: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([RoomEventEnum.ROOM_JOINED]),
        (
          payload: { roomJoined: Room },
          variables: SubscriptionRoomJoinedArgs,
        ) => payload.roomJoined.id === variables.id,
      ),
    },
    offerSent: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([RoomEventEnum.OFFER_SENT]),
        (
          payload: { offerSent: ParticipantOffer },
          variables: SubscriptionOfferSentArgs,
        ) => payload.offerSent.roomId === variables.id,
      ),
    },
    answerSent: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([RoomEventEnum.ANSWER_SENT]),
        (
          payload: { answerSent: ParticipantAnswer },
          variables: SubscriptionAnswerSentArgs,
        ) => payload.answerSent.roomId === variables.id,
      ),
    },
    candidateSent: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([RoomEventEnum.CANDIDATE_SENT]),
        (
          payload: { candidateSent: Room },
          variables: SubscriptionCandidateSentArgs,
        ) => payload.candidateSent.id === variables.id,
      ),
    },
    connectionStageUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator([RoomEventEnum.CONNECTION_STAGE_UPDATED]),
        (
          payload: { connectionStageUpdated: Room },
          variables: SubscriptionCandidateSentArgs,
        ) => payload.connectionStageUpdated.id === variables.id,
      ),
    },
  },
  Mutation: {
    async createRoom(_, { name }: MutationCreateRoomArgs) {
      let id; let
        participantId;
      do {
        id = randomUUID();
        participantId = randomUUID();
      }
      while (
        rooms.findIndex(
          // eslint-disable-next-line @typescript-eslint/no-loop-func
          (r) => r.id === id,
        ) !== -1
      );

      const owner = {
        id: participantId,
        name,
        connections: [],
      };

      const room = {
        id,
        participants: [owner],
      } as Room;

      rooms.push(room);

      return { room, participant: owner };
    },
    async joinRoom(_, { id, name }: MutationJoinRoomArgs) {
      const roomIndex = rooms.findIndex((r) => r.id === id);

      if (roomIndex === -1) {
        throw new ApolloError('room is not existed');
      }

      const room = rooms[roomIndex];

      let participantId;

      do {
        participantId = randomUUID();
      } while (
        room.participants?.findIndex(
          // eslint-disable-next-line @typescript-eslint/no-loop-func
          (p) => p.id === participantId,
        ) !== -1
      );

      // create new participant
      const newParticipant: Participant = {
        id: participantId,
        name,
        connections: [],
      };

      // add previous participants to current participant's connection list
      room.participants.forEach((p) => newParticipant.connections.push({
        id: p.id,
        stage: ParticipantConnectionStage.Starting,
      }));

      // meantime add current participant to other participants' connection list
      room.participants.forEach((p, index) => {
        room.participants[index].connections.push({
          id: participantId,
          stage: ParticipantConnectionStage.Starting,
        });
      });

      room.participants.push(newParticipant);

      await pubsub.publish(RoomEventEnum.ROOM_JOINED, {
        roomJoined: rooms[roomIndex],
      });

      return {
        room,
        participant: newParticipant,
      };
    },
    async offerTo(_, {
      roomId, sentId, receivedId, offer,
    }: MutationOfferToArgs) {
      const roomIndex = rooms.findIndex((r) => r.id === roomId);

      if (roomIndex === -1) {
        throw new ApolloError('room is not existed');
      }

      const offerTransfer: ParticipantOffer = {
        sentId,
        receivedId,
        offer,
        roomId,
      };

      await pubsub.publish(RoomEventEnum.OFFER_SENT, {
        offerSent: offerTransfer,
      });

      return true;
    },
    async answerTo(_, {
      roomId, sentId, receivedId, answer,
    }: MutationAnswerToArgs) {
      const roomIndex = rooms.findIndex((r) => r.id === roomId);

      if (roomIndex === -1) {
        throw new ApolloError('room is not existed');
      }

      const answerTransfer: ParticipantAnswer = {
        sentId,
        receivedId,
        answer,
        roomId,
      };

      await pubsub.publish(RoomEventEnum.ANSWER_SENT, {
        answerSent: answerTransfer,
      });

      return true;
    },
    async candidateTo(_, {
      roomId, sentId, receivedId, candidate,
    }: MutationCandidateToArgs) {
      const roomIndex = rooms.findIndex((r) => r.id === roomId);

      if (roomIndex === -1) {
        throw new ApolloError('room is not existed');
      }

      const candidateTransfer: ParticipantCandidate = {
        sentId,
        receivedId,
        candidate,
        roomId,
      };

      await pubsub.publish(RoomEventEnum.ANSWER_SENT, {
        candidateSent: candidateTransfer,
      });

      return true;
    },
    async updateConnectionStage(_, {
      roomId, participant, participantConnectionId, stage,
    }: MutationUpdateConnectionStageArgs) {
      const roomIndex = rooms.findIndex((r) => r.id === roomId);

      if (roomIndex === -1) {
        throw new ApolloError('room is not existed');
      }

      const room = rooms[roomIndex];

      const participantIndex = room.participants?.findIndex((p) => p.id === participant.id);

      if (participantIndex > -1) {
        throw new ApolloError('participant is existed');
      }

      const participantConnectionIndex = room
        .participants[participantIndex]
        .connections.findIndex((c) => c.id === participantConnectionId);

      if (participantConnectionIndex === -1) {
        throw new ApolloError('room logic error');
      }

      room
        .participants[participantIndex]
        .connections[participantConnectionIndex]
        .stage = stage;

      await pubsub.publish(RoomEventEnum.CONNECTION_STAGE_UPDATED, {
        connectionStageUpdated: room,
      });

      return true;
    },
  },
};
