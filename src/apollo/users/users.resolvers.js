/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.26
 */

import client from '../../client';

export default {
    User: {
        isMe: ({ id }, _, { loggedInUser }) => loggedInUser?.id === id,
        likeCount: ({ id }) => client.like.count({ where: { userId: id } }),

        postCount: ({ id }) => client.post.count({ where: { userId: id } }),

        commentCount: ({ id }) => client.comment.count({ where: { userId: id } }),

    }
}