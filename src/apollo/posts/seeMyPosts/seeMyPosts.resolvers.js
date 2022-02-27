/**
 * 생성일 : 22.02.26
 * 수정일 : 22.02.27
 */

import client from '../../../client';
import { checkLoginState } from '../../users/users.utils';
import { makeArrangement } from '../posts.utils';

export default {
    Query: {
        seeMyPosts: checkLoginState(
            (_, { offset, howToArrangement }, { loggedInUser }) => client.post.findMany({
                where: {
                    userId: loggedInUser.id
                },
                take: 6,
                skip: offset,
                orderBy: makeArrangement(howToArrangement)
            })
        )
    }
}