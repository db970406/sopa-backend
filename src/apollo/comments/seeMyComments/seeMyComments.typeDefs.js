/**
 * 생성일 : 22.02.26
 * 수정일 : -------
 */

import { gql } from 'apollo-server-express';

export default gql`
    type Query{
        seeMyComments(offset:Int):[Comment]
    }
`