/**
 * 생성일 : 22.02.26
 * 수정일 : -------
 */

import client from '../../../client';
import { checkLoginState } from '../../users/users.utils';

export default {
    Query: {
        seeMyLikes: checkLoginState(
            async (_, { offset }, { loggedInUser }) => client.like.findMany({
                where: {
                    userId: loggedInUser.id
                },
                include: {
                    post: {
                        include: {
                            user: true
                        }
                    }
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