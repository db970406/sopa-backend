/**
 * 생성일 : 22.02.07
 * 수정일 : 22.03.09
 */

import { gql } from 'apollo-server';

export default gql`
    type User{
        id:Int!
        githubURL:String
        level:Int!
        socialLogin:String
        name:String!
        email:String!
        createdAt:String!
        updatedAt:String
        likeCount:Int!
        likes:[Like]
        postCount:Int!
        posts:[Post]
        commentCount:Int!
        comments:[Comment]
        isMe:Boolean!
    }
`