/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.18
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
        isLiked:Boolean!
        likeCount:Int!
        commentCount:Int!
        comments(offset:Int):[Comment]
        readCount:Int!
        isExpired:Boolean!
        openChatLink:String
        frontends:[Frontend]
        backends:[Backend]
        apps:[App]
        isMine:Boolean!
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