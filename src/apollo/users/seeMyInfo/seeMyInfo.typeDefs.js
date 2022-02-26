/**
 * 생성일 : 22.02.22
 * 수정일 : 22.02.23
 */

import { gql } from 'apollo-server-express';

export default gql`
    type Query{
        seeMyInfo:User
    }
`