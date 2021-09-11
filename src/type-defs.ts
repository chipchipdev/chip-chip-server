import { gql } from 'apollo-server-express';

export const typeDefs = gql`

type Room {
    # the room id
    id: String!
    # the other participants that joined current room
    participants: [Participant!]!
}

type Participant {
    id: String!
    connections: [ParticipantConnection]!
}

type ParticipantConnection {
    id: String!
    stage: ParticipantConnectionStage
}

enum ParticipantConnectionStage {
    pending
    starting
    candidating
    connected
}

type ParticipantOffer {
    roomId: String!
    sentId: String!
    receivedId: String!
    offer: RTCSessionDescriptionInit
}

type ParticipantAnswer {
    roomId: String!
    sentId: String!
    receivedId: String!
    answer: RTCSessionDescriptionInit
}

type ParticipantCandidate {
    roomId: String!
    sentId: String!
    receivedId: String!
    candidate: RTCIceCandidate
}

# inherit from the standard web API
type RTCSessionDescriptionInit {
    sdp: String
    type:RTCSdpEnum
}

type RTCIceCandidate {
   candidate: String
   component: RTCIceComponentEnum
   foundation: String
   port: Int
   priority: Int
   protocol: RTCIceProtocolEnum
   relatedAddress: String
   relatedPort: Int
   sdpMLineIndex: Int
   sdpMid: String
   tcpType: RTCIceTcpCandidateEnum
   type: RTCIceCandidateType
   usernameFragment: String
}

enum RTCSdpEnum {
    answer
    offer
    pranswer
    rollback
}

enum RTCIceComponentEnum {
    rtcp
    rtp
}

enum RTCIceProtocolEnum {
    tcp
    udp
}

enum RTCIceTcpCandidateEnum {
    active
    passive
    so
}

enum RTCIceCandidateType{
    host
    prflx
    relay
    srflx
}

input RTCSessionDescriptionInitInput {
    sdp: String
    type:RTCSdpEnum
}

input ParticipantInput {
    id: String!
}

input RTCIceCandidateInput {
    candidate: String
    component: RTCIceComponentEnum
    foundation: String
    port: Int
    priority: Int
    protocol: RTCIceProtocolEnum
    relatedAddress: String
    relatedPort: Int
    sdpMLineIndex: Int
    sdpMid: String
    tcpType: RTCIceTcpCandidateEnum
    type: RTCIceCandidateType
    usernameFragment: String
}

type Mutation {
    createRoom(id: String!, participant: ParticipantInput!): Room!
    joinRoom(id: String!, participant: ParticipantInput!): Room!
    # RTC Connection Part
    offerTo(
        roomId: String!, 
        sentId: String!, 
        receivedId: String!, 
        offer: RTCSessionDescriptionInitInput
    ): Boolean
    answerTo(
        roomId: String!,
        sentId: String!,
        receivedId: String!,
        answer: RTCSessionDescriptionInitInput
    ): Boolean
    candidateTo(
        roomId: String!,
        sentId: String!,
        receivedId: String!,
        candidate: RTCIceCandidateInput
    ): Boolean
    updateConnectionStage(
        roomId: String!,
        participant: ParticipantInput,
        participantConnectionId: String!
        stage: ParticipantConnectionStage
    ): Boolean
}

type Query {
    room(id: String!): Room
}

type Subscription {
    roomJoined(id: String!): Room
    offerSent(id: String!): ParticipantOffer
    answerSent(id: String!): ParticipantAnswer
    candidateSent(id: String!): ParticipantCandidate
    connectionStageUpdated(id: String!): Room
}
`;
