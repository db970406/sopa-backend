/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.26
 */

import client from '../../../client'

// 게시글 상세보기 기능 + 작성자가 아닌 유저가 보는 경우 조회수 1씩 증가
export default {
    Query: {
        seePost: async (_, { postId }, { loggedInUser }) => {
            try {
                const findPost = await client.post.findUnique({
                    where: {
                        id: postId
                    }
                });

                if (!findPost) throw new Error("존재하지 않는 게시글입니다.");

                // 비작성자가 조회하면 조회수 1씩 증가
                if (findPost.userId !== loggedInUser?.id) {
                    await client.post.update({
                        where: {
                            id: postId,
                        },
                        data: {
                            readCount: ++findPost.readCount
                        }
                    })
                }

                return {
                    post: findPost,
                }
            } catch (error) {
                return {
                    post: null,
                    error: error.message
                }
            }
        }
    }
}