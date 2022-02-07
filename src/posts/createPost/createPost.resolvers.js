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