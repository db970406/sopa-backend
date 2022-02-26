/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.26
 */

import client from '../../../client';


// 제목으로 검색하기
export default {
    Query: {
        searchPosts: (_, { title, offset }) => client.post.findMany({
            where: {
                title: {
                    contains: title
                }
            },
            take: 6,
            skip: offset,
            orderBy: {
                createdAt: "desc"
            }
        })
    }
}