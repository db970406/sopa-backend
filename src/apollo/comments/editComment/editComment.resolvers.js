/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

import client from '../../../client';
import { checkLoginState } from '../../users/users.utils';

export default {
    Mutation: {
        editComment: checkLoginState(
            async (_, { commentId, comment }, { loggedInUser }) => {
                try {

                    // 존재하는 댓글인지 체크하고, 있는 경우 connect되어 있는 userId만 가져온다
                    const isExistComment = await client.comment.findUnique({
                        where: {
                            id: commentId
                        },
                        select: {
                            userId: true
                        }
                    });
                    if (!isExistComment) throw new Error("존재하지 않는 댓글입니다.");

                    // 댓글이 있다면 위에서 가져온 userId로 수정권한이 있는지 체크
                    else if (isExistComment.userId !== loggedInUser.id) throw new Error("댓글의 주인이 아닙니다.");
                    else {
                        await client.comment.update({
                            where: {
                                id: commentId
                            },
                            data: {
                                comment
                            }
                        });

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