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
        frontends:[Frontend]
        backends:[Backend]
        apps:[App]
    }

    type Like{
        id:Int!
        user:User!
        post:Post!
        createdAt:String!
        updatedAt:String!
    }

    type Frontend{
        id:Int!
        skill:String!
        posts:[Post]
    }
    type Backend{
        id:Int!
        skill:String!
        posts:[Post]
    }
    type App{
        id:Int!
        skill:String!
        posts:[Post]
    }
`