import { gql } from 'apollo-server-express';

export const typeDefs = gql`

type Room {
    # the room id
    id: String!
    # the owner for current room
    owner: Participant!
    # the other participants that joined current room
    participants: [Participant!]
}

type Participant {
    id: String!
    offer: RTCSessionDescriptionInit
    answer: RTCSessionDescriptionInit
    candidate: String
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

type Mutation {
    createRoom(id: String!): Room!
    joinRoom(id: String!): Room!
}

type Query {
    room(id: String!): Room
}

type Subscription {
    roomCreated: Room 
}



`;
