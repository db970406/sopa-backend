/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.12
 */

import client from '../../client';
import { checkLoginState } from '../../users/users.utils';

/** 
 * 팀원을 다 구하면 작성자는 게시글의 만료 설정을 할 수 있다.
 * 추후 유저의 레벨업에 활용할 것이다.
 */
export default {
    Mutation: checkLoginState(
        async (_, { postId }, { loggedInUser }) => {
            try {
                const isExistPost = await client.post.findUnique({
                    where: {
                        id: postId
                    },
                    select: {
                        userId: true
                    }
                })
                if (!isExistPost) throw new Error("존재하지 않는 게시물입니다.");

                else if (isExistPost.userId !== loggedInUser.id) throw new Error("게시글의 주인이 아닙니다.");

                else {
                    await client.post.update({
                        where: {
                            id: postId
                        },
                        data: {
                            isExpired: true
                        }
                    });

                    return {
                        ok: true
                    };
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        }
    )
}