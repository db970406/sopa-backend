/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.12
 */

import { gql } from 'apollo-server';

export default gql`
    type Post{
        id:Int!
        title:String!
        description:String
        user:User!
        createdAt:String!
        updatedAt:String!
        likeCount:Int!
        commentCount:Int!
        comments:[Comment]
        readCount:Int!
        isExpired:Boolean!
    }

    type Like{
        id:Int!
        user:User!
        post:Post!
        createdAt:String!
        updatedAt:String!
    }
`