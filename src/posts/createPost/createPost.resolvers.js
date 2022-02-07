/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

import client from '../../client';
import { checkLoginState } from '../../users/users.utils';

export default {
    Mutation: {
        createPost: checkLoginState(
            async (_, { title, description }, { loggedInUser }) => {
                try {
                    // 게시글을 생성하고 작성 User와 connect된다.
                    await client.post.create({
                        data: {
                            title,
                            description,
                            user: {
                                connect: {
                                    id: loggedInUser.id
                                }
                            }
                        }
                    });

                    return {
                        ok: true
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
}