/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.23
 */

import { gql } from 'apollo-server';

export default gql`
    type Mutation{
        editPost(postId:Int!,title:String!,description:String, openChatLink:String):MutationResults!
    }
`