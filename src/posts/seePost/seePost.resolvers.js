/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

import client from '../../client';

// 게시글 상세보기
export default {
    Query: {
        seePost: (_, { postId }) => client.post.findUnique({
            where: {
                id: postId
            }
        })
    }
}