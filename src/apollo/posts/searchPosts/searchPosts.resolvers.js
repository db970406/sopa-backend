/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.23
 */

import client from '../../../client';


// 제목으로 검색하기
export default {
    Query: {
        searchPosts: (_, { title, pagination }) => client.post.findMany({
            where: {
                title: {
                    contains: title
                }
            },
            take: 20,
            skip: pagination,
            orderBy: {
                createdAt: "desc"
            }
        })
    }
}