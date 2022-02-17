/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.12
 */

import client from '../../../client';

export default {
    Query: {
        seeMyProfile: async (_, __, { loggedInUser }) => client.user.findUnique({
            where: {
                id: loggedInUser.id
            },
            include: {
                likes: true,
                posts: true,
                comments: true
            }
        })
    }
}