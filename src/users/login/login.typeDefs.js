/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

import { gql } from 'apollo-server';

export default gql`
    type LoginResults{
        ok:Boolean!
        token:String
        error:String
    }
    type Mutation{
        login(email:String!,password:String!):LoginResults!
    }
`;