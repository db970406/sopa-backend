/**
 * 생성일 : 22.02.26
 * 수정일 : 22.02.27
 */

import { gql } from 'apollo-server-express';

export default gql`
    type Query{
        seeMyPosts(offset:Int,howToSort:String):[Post]
    }
`