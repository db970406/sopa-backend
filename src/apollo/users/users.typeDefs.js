/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.17
 */

import { gql } from 'apollo-server';

export default gql`
    type User{
        id:Int!
        level:Int!
        socialLogin:String
        name:String!
        email:String!
        password:String!
        createdAt:String!
        likes:[Like]
        posts:[Post]
        comments:[Comment]
        isMe:Boolean!
    }
`