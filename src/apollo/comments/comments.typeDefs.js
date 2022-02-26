/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.23
 */

import { gql } from 'apollo-server';

export default gql`
    type Comment{
        id:Int!
        comment:String!
        user:User!
        post:Post!
        postId:Int!
        isMine:Boolean!
        createdAt:String!
        updatedAt:String!
    }
`