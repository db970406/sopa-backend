/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

import { gql } from 'apollo-server';

export default gql`
    type Post{
        id:Int!
        title:String!
        description:String
        owner:User!
        createdAt:String!
        updatedAt:String!
    }
`