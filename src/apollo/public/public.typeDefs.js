/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

import { gql } from 'apollo-server';

// 대부분의 Mutation Resolver의 공통 응답
export default gql`
    type MutationResults{
        ok:Boolean!
        error:String
    }
`