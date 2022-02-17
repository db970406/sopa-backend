/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

import client from '../../client';

export default {
    Post: {
        user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
        likeCount: ({ id }) => client.like.count({ where: { postId: id } }),
        commentCount: ({ id }) => client.comment.count({ where: { postId: id } }),
        comments: ({ id }) => client.comment.findMany({ where: { postId: id } }),
    }
}