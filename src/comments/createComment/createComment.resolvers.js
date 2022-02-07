/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

import client from '../../client';
import { checkLoginState } from '../../users/users.utils';

export default {
    Mutation: {
        createComment: checkLoginState(
            async (_, { postId, comment }, { loggedInUser }) => {
                try {
                    // 게시물이 존재하는 지 확인
                    const isExistPost = await client.post.count({
                        where: {
                            id: postId
                        }
                    });
                    if (!isExistPost) throw new Error("존재하지 않는 게시글입니다.");

                    await client.comment.create({
                        data: {
                            comment,
                            post: {
                                connect: {
                                    id: postId
                                }
                            },
                            user: {
                                connect: {
                                    id: loggedInUser.id
                                }
                            }
                        }
                    });

                    return {
                        ok: true
                    }
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    }
                }
            }
        )
    }
}