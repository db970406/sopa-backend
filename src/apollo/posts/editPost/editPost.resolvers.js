/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

import client from '../../../client';
import { checkLoginState } from '../../users/users.utils';

export default {
    Mutation: {
        editPost: checkLoginState(
            async (_, { postId, title, description }, { loggedInUser }) => {
                try {
                    // 존재하는 게시글인지 체크하고, 있는 경우 connect되어 있는 userId만 가져온다
                    const isExistPost = await client.post.findUnique({
                        where: {
                            id: postId
                        },
                        select: {
                            userId: true
                        }
                    })
                    if (!isExistPost) throw new Error("존재하지 않는 게시글입니다.")

                    // 게시글이 있다면 위에서 가져온 userId로 수정권한이 있는지 체크
                    else if (isExistPost.userId !== loggedInUser.id) throw new Error("게시글의 주인이 아닙니다.");
                    else {
                        await client.post.update({
                            where: {
                                id: postId
                            },
                            data: {
                                title,
                                description
                            }
                        })

                        return {
                            ok: true
                        }
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