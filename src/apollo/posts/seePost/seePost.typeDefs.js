/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.26
 */

import { gql } from 'apollo-server';

export default gql`
    type SeePostResults{
        post:Post
        error:String
    }
    type Query{
        seePost(postId:Int!):SeePostResults!
    }
`