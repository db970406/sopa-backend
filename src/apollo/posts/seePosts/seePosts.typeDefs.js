/**
 * 생성일 : 22.02.07
 * 수정일 : 22.03.03
 */

import { gql } from "apollo-server";

export default gql`
    type Query{
        seePosts(offset:Int,skills:String,howToSort:String):[Post]
    }
`