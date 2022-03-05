/**
 * 생성일 : 22.02.26
 * 수정일 : 22.03.03
 */

import client from '../../../client';
import { checkLoginState } from '../../users/users.utils';
import { makeSortMethod } from '../posts.utils';

export default {
    Query: {
        seeMyLikes: checkLoginState(
            (_, { offset, howToSort }, { loggedInUser }) => client.post.findMany({
                where: {
                    likes: {
                        some: {
                            userId: loggedInUser.id
                        }
                    }
                },
                take: 6,
                skip: offset,
                orderBy: makeSortMethod(howToSort)
            })
        )
    }
}