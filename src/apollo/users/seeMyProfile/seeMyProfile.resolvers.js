/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.23
 */

import client from '../../../client';

export default {
    Query: {
        seeMyProfile: async (_, __, { loggedInUser }) => client.user.findUnique({
            where: {
                id: loggedInUser.id
            }
        })
    }
}