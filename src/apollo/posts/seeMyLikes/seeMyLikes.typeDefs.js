/**
 * 생성일 : 22.02.26
 * 수정일 : 22.03.03
 */

import { gql } from 'apollo-server-express';

export default gql`
    type Query{
        seeMyLikes(offset:Int,howToSort:String):[Post]
    }
`