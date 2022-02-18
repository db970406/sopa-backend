/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.18
 */

import client from '../../client';

export default {
    Post: {
        user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
        likeCount: ({ id }) => client.like.count({ where: { postId: id } }),
        isLiked: async ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) return false;

            const checkIsLiked = await client.like.count({
                where: {
                    userId: loggedInUser.id,
                    postId: id
                }
            });

            return Boolean(checkIsLiked);
        },
        commentCount: ({ id }) => client.comment.count({ where: { postId: id } }),
        comments: ({ id }) => client.comment.findMany({ where: { postId: id } }),
    }
}