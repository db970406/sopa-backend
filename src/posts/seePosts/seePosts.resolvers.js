/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

import client from "../../client";

export default {
    Query: {
        seePosts: async (_, { pagination }) => {

            // Home에 게시글들을 나열할 때 pagination을 활용한다(page식을 쓸 것인지는 나중에 생각해보자)
            const posts = await client.post.findMany({
                take: 20,
                skip: pagination
            })

            return posts
        }
    }
}