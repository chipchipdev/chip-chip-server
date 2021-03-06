import { gql } from 'apollo-server-express';

export const typeDefs = gql`

type Room {
    # the room id
    id: String!
    # the other participants that joined current room
    participants: [Participant!]!
}

type RoomWithCurrentParticipant {
    room: Room!
    participant: Participant!
}

type Participant {
    id: String!
    name: String!
    connections: [ParticipantConnection]!
}

type ParticipantConnection {
    id: String!
    stage: ParticipantConnectionStage
}

enum ParticipantConnectionStage {
    pending
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
    name: String!
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
    createRoom(name: String!): RoomWithCurrentParticipant!
    joinRoom(id: String!, name: String!): RoomWithCurrentParticipant!
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
    roomJoined(id: String!): RoomWithCurrentParticipant
    offerSent(id: String!): ParticipantOffer
    answerSent(id: String!): ParticipantAnswer
    candidateSent(id: String!): ParticipantCandidate
    connectionStageUpdated(id: String!): Room
}
`;
