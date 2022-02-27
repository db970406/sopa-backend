/**
 * 생성일 : 22.02.27
 * 수정일 : ------
 */

import { gql } from 'apollo-server-express';

export default gql`
    type Count{
        count:Int!
    }
    type Query{
        seePostsCount(skills:String):Count!
    }
`