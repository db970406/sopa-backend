/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

import { gql } from 'apollo-server';

export default gql`
    type Mutation{
        editUser(name:String,password:String):MutationResults!
    }
`