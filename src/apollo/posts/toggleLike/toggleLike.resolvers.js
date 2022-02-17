/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

import client from '../../../client';
import { checkLoginState } from '../../users/users.utils';

/** 
 * 게시글 관심 기능만을 위해서라면 굳이 따로 데이터 모델로 만들 필요는 없었다.
 * 추후 관심 유저 보기 기능 추가 등 확장성 고려해서 데이터 모델로 만들었다.
 */
export default {
    Mutation: {
        toggleLike: checkLoginState(
            async (_, { postId }, { loggedInUser }) => {
                try {
                    // 게시물이 존재하는 지 확인
                    const isExistPost = await client.post.count({
                        where: {
                            id: postId
                        }
                    });
                    if (!isExistPost) throw new Error("존재하지 않는 게시물입니다.");

                    // 관심 여부 확인 후 있다면 삭제, 없다면 추가
                    const isLiked = await client.like.count({
                        where: {
                            postId,
                            userId: loggedInUser.id
                        }
                    })

                    if (isLiked) {
                        await client.like.delete({
                            where: {
                                userId_postId: {
                                    userId: loggedInUser.id,
                                    postId
                                }
                            }
                        })
                    } else {
                        await client.like.create({
                            data: {
                                user: {
                                    connect: {
                                        id: loggedInUser.id
                                    }
                                },
                                post: {
                                    connect: {
                                        id: postId
                                    }
                                }
                            }
                        })
                    }

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