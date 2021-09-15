import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  answerTo?: Maybe<Scalars['Boolean']>;
  candidateTo?: Maybe<Scalars['Boolean']>;
  createRoom: RoomWithCurrentParticipant;
  joinRoom: RoomWithCurrentParticipant;
  offerTo?: Maybe<Scalars['Boolean']>;
  updateConnectionStage?: Maybe<Scalars['Boolean']>;
};


export type MutationAnswerToArgs = {
  answer?: Maybe<RtcSessionDescriptionInitInput>;
  receivedId: Scalars['String'];
  roomId: Scalars['String'];
  sentId: Scalars['String'];
};


export type MutationCandidateToArgs = {
  candidate?: Maybe<RtcIceCandidateInput>;
  receivedId: Scalars['String'];
  roomId: Scalars['String'];
  sentId: Scalars['String'];
};


export type MutationCreateRoomArgs = {
  name: Scalars['String'];
};


export type MutationJoinRoomArgs = {
  id: Scalars['String'];
  name: Scalars['String'];
};


export type MutationOfferToArgs = {
  offer?: Maybe<RtcSessionDescriptionInitInput>;
  receivedId: Scalars['String'];
  roomId: Scalars['String'];
  sentId: Scalars['String'];
};


export type MutationUpdateConnectionStageArgs = {
  participant?: Maybe<ParticipantInput>;
  participantConnectionId: Scalars['String'];
  roomId: Scalars['String'];
  stage?: Maybe<ParticipantConnectionStage>;
};

export type Participant = {
  __typename?: 'Participant';
  connections: Array<Maybe<ParticipantConnection>>;
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ParticipantAnswer = {
  __typename?: 'ParticipantAnswer';
  answer?: Maybe<RtcSessionDescriptionInit>;
  receivedId: Scalars['String'];
  roomId: Scalars['String'];
  sentId: Scalars['String'];
};

export type ParticipantCandidate = {
  __typename?: 'ParticipantCandidate';
  candidate?: Maybe<RtcIceCandidate>;
  receivedId: Scalars['String'];
  roomId: Scalars['String'];
  sentId: Scalars['String'];
};

export type ParticipantConnection = {
  __typename?: 'ParticipantConnection';
  id: Scalars['String'];
  stage?: Maybe<ParticipantConnectionStage>;
};

export enum ParticipantConnectionStage {
  Connected = 'connected',
  Pending = 'pending'
}

export type ParticipantInput = {
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ParticipantOffer = {
  __typename?: 'ParticipantOffer';
  offer?: Maybe<RtcSessionDescriptionInit>;
  receivedId: Scalars['String'];
  roomId: Scalars['String'];
  sentId: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  room?: Maybe<Room>;
};


export type QueryRoomArgs = {
  id: Scalars['String'];
};

export type RtcIceCandidate = {
  __typename?: 'RTCIceCandidate';
  candidate?: Maybe<Scalars['String']>;
  component?: Maybe<RtcIceComponentEnum>;
  foundation?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['Int']>;
  priority?: Maybe<Scalars['Int']>;
  protocol?: Maybe<RtcIceProtocolEnum>;
  relatedAddress?: Maybe<Scalars['String']>;
  relatedPort?: Maybe<Scalars['Int']>;
  sdpMLineIndex?: Maybe<Scalars['Int']>;
  sdpMid?: Maybe<Scalars['String']>;
  tcpType?: Maybe<RtcIceTcpCandidateEnum>;
  type?: Maybe<RtcIceCandidateType>;
  usernameFragment?: Maybe<Scalars['String']>;
};

export type RtcIceCandidateInput = {
  candidate?: Maybe<Scalars['String']>;
  component?: Maybe<RtcIceComponentEnum>;
  foundation?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['Int']>;
  priority?: Maybe<Scalars['Int']>;
  protocol?: Maybe<RtcIceProtocolEnum>;
  relatedAddress?: Maybe<Scalars['String']>;
  relatedPort?: Maybe<Scalars['Int']>;
  sdpMLineIndex?: Maybe<Scalars['Int']>;
  sdpMid?: Maybe<Scalars['String']>;
  tcpType?: Maybe<RtcIceTcpCandidateEnum>;
  type?: Maybe<RtcIceCandidateType>;
  usernameFragment?: Maybe<Scalars['String']>;
};

export enum RtcIceCandidateType {
  Host = 'host',
  Prflx = 'prflx',
  Relay = 'relay',
  Srflx = 'srflx'
}

export enum RtcIceComponentEnum {
  Rtcp = 'rtcp',
  Rtp = 'rtp'
}

export enum RtcIceProtocolEnum {
  Tcp = 'tcp',
  Udp = 'udp'
}

export enum RtcIceTcpCandidateEnum {
  Active = 'active',
  Passive = 'passive',
  So = 'so'
}

export enum RtcSdpEnum {
  Answer = 'answer',
  Offer = 'offer',
  Pranswer = 'pranswer',
  Rollback = 'rollback'
}

export type RtcSessionDescriptionInit = {
  __typename?: 'RTCSessionDescriptionInit';
  sdp?: Maybe<Scalars['String']>;
  type?: Maybe<RtcSdpEnum>;
};

export type RtcSessionDescriptionInitInput = {
  sdp?: Maybe<Scalars['String']>;
  type?: Maybe<RtcSdpEnum>;
};

export type Room = {
  __typename?: 'Room';
  id: Scalars['String'];
  participants: Array<Participant>;
};

export type RoomWithCurrentParticipant = {
  __typename?: 'RoomWithCurrentParticipant';
  participant: Participant;
  room: Room;
};

export type Subscription = {
  __typename?: 'Subscription';
  answerSent?: Maybe<ParticipantAnswer>;
  candidateSent?: Maybe<ParticipantCandidate>;
  connectionStageUpdated?: Maybe<Room>;
  offerSent?: Maybe<ParticipantOffer>;
  roomJoined?: Maybe<RoomWithCurrentParticipant>;
};


export type SubscriptionAnswerSentArgs = {
  id: Scalars['String'];
};


export type SubscriptionCandidateSentArgs = {
  id: Scalars['String'];
};


export type SubscriptionConnectionStageUpdatedArgs = {
  id: Scalars['String'];
};


export type SubscriptionOfferSentArgs = {
  id: Scalars['String'];
};


export type SubscriptionRoomJoinedArgs = {
  id: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  Participant: ResolverTypeWrapper<Participant>;
  ParticipantAnswer: ResolverTypeWrapper<ParticipantAnswer>;
  ParticipantCandidate: ResolverTypeWrapper<ParticipantCandidate>;
  ParticipantConnection: ResolverTypeWrapper<ParticipantConnection>;
  ParticipantConnectionStage: ParticipantConnectionStage;
  ParticipantInput: ParticipantInput;
  ParticipantOffer: ResolverTypeWrapper<ParticipantOffer>;
  Query: ResolverTypeWrapper<{}>;
  RTCIceCandidate: ResolverTypeWrapper<RtcIceCandidate>;
  RTCIceCandidateInput: RtcIceCandidateInput;
  RTCIceCandidateType: RtcIceCandidateType;
  RTCIceComponentEnum: RtcIceComponentEnum;
  RTCIceProtocolEnum: RtcIceProtocolEnum;
  RTCIceTcpCandidateEnum: RtcIceTcpCandidateEnum;
  RTCSdpEnum: RtcSdpEnum;
  RTCSessionDescriptionInit: ResolverTypeWrapper<RtcSessionDescriptionInit>;
  RTCSessionDescriptionInitInput: RtcSessionDescriptionInitInput;
  Room: ResolverTypeWrapper<Room>;
  RoomWithCurrentParticipant: ResolverTypeWrapper<RoomWithCurrentParticipant>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  Mutation: {};
  Participant: Participant;
  ParticipantAnswer: ParticipantAnswer;
  ParticipantCandidate: ParticipantCandidate;
  ParticipantConnection: ParticipantConnection;
  ParticipantInput: ParticipantInput;
  ParticipantOffer: ParticipantOffer;
  Query: {};
  RTCIceCandidate: RtcIceCandidate;
  RTCIceCandidateInput: RtcIceCandidateInput;
  RTCSessionDescriptionInit: RtcSessionDescriptionInit;
  RTCSessionDescriptionInitInput: RtcSessionDescriptionInitInput;
  Room: Room;
  RoomWithCurrentParticipant: RoomWithCurrentParticipant;
  String: Scalars['String'];
  Subscription: {};
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  answerTo?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationAnswerToArgs, 'receivedId' | 'roomId' | 'sentId'>>;
  candidateTo?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationCandidateToArgs, 'receivedId' | 'roomId' | 'sentId'>>;
  createRoom?: Resolver<ResolversTypes['RoomWithCurrentParticipant'], ParentType, ContextType, RequireFields<MutationCreateRoomArgs, 'name'>>;
  joinRoom?: Resolver<ResolversTypes['RoomWithCurrentParticipant'], ParentType, ContextType, RequireFields<MutationJoinRoomArgs, 'id' | 'name'>>;
  offerTo?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationOfferToArgs, 'receivedId' | 'roomId' | 'sentId'>>;
  updateConnectionStage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationUpdateConnectionStageArgs, 'participantConnectionId' | 'roomId'>>;
};

export type ParticipantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Participant'] = ResolversParentTypes['Participant']> = {
  connections?: Resolver<Array<Maybe<ResolversTypes['ParticipantConnection']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParticipantAnswerResolvers<ContextType = any, ParentType extends ResolversParentTypes['ParticipantAnswer'] = ResolversParentTypes['ParticipantAnswer']> = {
  answer?: Resolver<Maybe<ResolversTypes['RTCSessionDescriptionInit']>, ParentType, ContextType>;
  receivedId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roomId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParticipantCandidateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ParticipantCandidate'] = ResolversParentTypes['ParticipantCandidate']> = {
  candidate?: Resolver<Maybe<ResolversTypes['RTCIceCandidate']>, ParentType, ContextType>;
  receivedId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roomId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParticipantConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ParticipantConnection'] = ResolversParentTypes['ParticipantConnection']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  stage?: Resolver<Maybe<ResolversTypes['ParticipantConnectionStage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ParticipantOfferResolvers<ContextType = any, ParentType extends ResolversParentTypes['ParticipantOffer'] = ResolversParentTypes['ParticipantOffer']> = {
  offer?: Resolver<Maybe<ResolversTypes['RTCSessionDescriptionInit']>, ParentType, ContextType>;
  receivedId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roomId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sentId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  room?: Resolver<Maybe<ResolversTypes['Room']>, ParentType, ContextType, RequireFields<QueryRoomArgs, 'id'>>;
};

export type RtcIceCandidateResolvers<ContextType = any, ParentType extends ResolversParentTypes['RTCIceCandidate'] = ResolversParentTypes['RTCIceCandidate']> = {
  candidate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  component?: Resolver<Maybe<ResolversTypes['RTCIceComponentEnum']>, ParentType, ContextType>;
  foundation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  port?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  priority?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  protocol?: Resolver<Maybe<ResolversTypes['RTCIceProtocolEnum']>, ParentType, ContextType>;
  relatedAddress?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  relatedPort?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sdpMLineIndex?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sdpMid?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  tcpType?: Resolver<Maybe<ResolversTypes['RTCIceTcpCandidateEnum']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['RTCIceCandidateType']>, ParentType, ContextType>;
  usernameFragment?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RtcSessionDescriptionInitResolvers<ContextType = any, ParentType extends ResolversParentTypes['RTCSessionDescriptionInit'] = ResolversParentTypes['RTCSessionDescriptionInit']> = {
  sdp?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['RTCSdpEnum']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomResolvers<ContextType = any, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  participants?: Resolver<Array<ResolversTypes['Participant']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RoomWithCurrentParticipantResolvers<ContextType = any, ParentType extends ResolversParentTypes['RoomWithCurrentParticipant'] = ResolversParentTypes['RoomWithCurrentParticipant']> = {
  participant?: Resolver<ResolversTypes['Participant'], ParentType, ContextType>;
  room?: Resolver<ResolversTypes['Room'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  answerSent?: SubscriptionResolver<Maybe<ResolversTypes['ParticipantAnswer']>, "answerSent", ParentType, ContextType, RequireFields<SubscriptionAnswerSentArgs, 'id'>>;
  candidateSent?: SubscriptionResolver<Maybe<ResolversTypes['ParticipantCandidate']>, "candidateSent", ParentType, ContextType, RequireFields<SubscriptionCandidateSentArgs, 'id'>>;
  connectionStageUpdated?: SubscriptionResolver<Maybe<ResolversTypes['Room']>, "connectionStageUpdated", ParentType, ContextType, RequireFields<SubscriptionConnectionStageUpdatedArgs, 'id'>>;
  offerSent?: SubscriptionResolver<Maybe<ResolversTypes['ParticipantOffer']>, "offerSent", ParentType, ContextType, RequireFields<SubscriptionOfferSentArgs, 'id'>>;
  roomJoined?: SubscriptionResolver<Maybe<ResolversTypes['RoomWithCurrentParticipant']>, "roomJoined", ParentType, ContextType, RequireFields<SubscriptionRoomJoinedArgs, 'id'>>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Participant?: ParticipantResolvers<ContextType>;
  ParticipantAnswer?: ParticipantAnswerResolvers<ContextType>;
  ParticipantCandidate?: ParticipantCandidateResolvers<ContextType>;
  ParticipantConnection?: ParticipantConnectionResolvers<ContextType>;
  ParticipantOffer?: ParticipantOfferResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RTCIceCandidate?: RtcIceCandidateResolvers<ContextType>;
  RTCSessionDescriptionInit?: RtcSessionDescriptionInitResolvers<ContextType>;
  Room?: RoomResolvers<ContextType>;
  RoomWithCurrentParticipant?: RoomWithCurrentParticipantResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

