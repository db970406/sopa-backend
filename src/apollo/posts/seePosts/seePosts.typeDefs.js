/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.12
 */

import { gql } from "apollo-server";

export default gql`
    type Query{
        seePosts(pagination:Int,skills:String):[Post]
    }
`