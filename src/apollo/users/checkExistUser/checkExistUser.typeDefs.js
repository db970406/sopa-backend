/**
 * 생성일 : 22.03.06
 * 수정일 : ------
 */

import { gql } from 'apollo-server';

export default gql`
    type Mutation{
        checkExistUser(name:String!,email:String!):MutationResults!
    }
`