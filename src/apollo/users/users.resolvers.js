/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.23
 */

import client from '../../client';

export default {
    User: {
        isMe: ({ id }, _, { loggedInUser }) => loggedInUser?.id === id,
        likeCount: ({ id }) => client.like.count({ where: { userId: id } }),
        likes: ({ id }) => client.like.findMany({
            where: { userId: id },
            include: {
                post: {
                    include: {
                        frontends: true,
                        backends: true,
                        apps: true,
                    }
                }
            }
        }),

        postCount: ({ id }) => client.post.count({ where: { userId: id } }),
        posts: ({ id }) => client.post.findMany({
            where: { userId: id },
            include: {
                frontends: true,
                backends: true,
                apps: true,
                comments: true
            },
            orderBy: {
                createdAt: "desc"
            }
        }),

        commentCount: ({ id }) => client.comment.count({ where: { userId: id } }),
        comments: ({ id }) => client.comment.findMany({
            where: { userId: id },
            include: {
                user: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

    }
}