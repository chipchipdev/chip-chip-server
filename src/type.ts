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
  createRoom: Room;
  joinRoom: Room;
};


export type MutationCreateRoomArgs = {
  id: Scalars['String'];
};


export type MutationJoinRoomArgs = {
  id: Scalars['String'];
};

export type Participant = {
  __typename?: 'Participant';
  answer?: Maybe<RtcSessionDescriptionInit>;
  candidate?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  offer?: Maybe<RtcSessionDescriptionInit>;
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

export type Room = {
  __typename?: 'Room';
  id: Scalars['String'];
  owner: Participant;
  participants?: Maybe<Array<Participant>>;
};

export type Subscription = {
  __typename?: 'Subscription';
  roomCreated?: Maybe<Room>;
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
  Query: ResolverTypeWrapper<{}>;
  RTCIceCandidate: ResolverTypeWrapper<RtcIceCandidate>;
  RTCIceCandidateType: RtcIceCandidateType;
  RTCIceComponentEnum: RtcIceComponentEnum;
  RTCIceProtocolEnum: RtcIceProtocolEnum;
  RTCIceTcpCandidateEnum: RtcIceTcpCandidateEnum;
  RTCSdpEnum: RtcSdpEnum;
  RTCSessionDescriptionInit: ResolverTypeWrapper<RtcSessionDescriptionInit>;
  Room: ResolverTypeWrapper<Room>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  Mutation: {};
  Participant: Participant;
  Query: {};
  RTCIceCandidate: RtcIceCandidate;
  RTCSessionDescriptionInit: RtcSessionDescriptionInit;
  Room: Room;
  String: Scalars['String'];
  Subscription: {};
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createRoom?: Resolver<ResolversTypes['Room'], ParentType, ContextType, RequireFields<MutationCreateRoomArgs, 'id'>>;
  joinRoom?: Resolver<ResolversTypes['Room'], ParentType, ContextType, RequireFields<MutationJoinRoomArgs, 'id'>>;
};

export type ParticipantResolvers<ContextType = any, ParentType extends ResolversParentTypes['Participant'] = ResolversParentTypes['Participant']> = {
  answer?: Resolver<Maybe<ResolversTypes['RTCSessionDescriptionInit']>, ParentType, ContextType>;
  candidate?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  offer?: Resolver<Maybe<ResolversTypes['RTCSessionDescriptionInit']>, ParentType, ContextType>;
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
  owner?: Resolver<ResolversTypes['Participant'], ParentType, ContextType>;
  participants?: Resolver<Maybe<Array<ResolversTypes['Participant']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  roomCreated?: SubscriptionResolver<Maybe<ResolversTypes['Room']>, "roomCreated", ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  Participant?: ParticipantResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RTCIceCandidate?: RtcIceCandidateResolvers<ContextType>;
  RTCSessionDescriptionInit?: RtcSessionDescriptionInitResolvers<ContextType>;
  Room?: RoomResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

