/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.18
 */

import { gql } from 'apollo-server-express';

export default gql`
    type Mutation{
        toggleLike(postId:Int!):MutationResults!
    }
`