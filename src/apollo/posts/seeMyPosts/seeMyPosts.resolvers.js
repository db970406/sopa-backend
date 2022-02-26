/**
 * 생성일 : 22.02.26
 * 수정일 : -------
 */

import client from '../../../client';
import { checkLoginState } from '../../users/users.utils';

export default {
    Query: {
        seeMyPosts: checkLoginState(
            async (_, { offset }, { loggedInUser }) => client.post.findMany({
                where: {
                    userId: loggedInUser.id
                },
                take: 6,
                skip: offset,
                orderBy: {
                    createdAt: "desc"
                }
            })
        )
    }
}