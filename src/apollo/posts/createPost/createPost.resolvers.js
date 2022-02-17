/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.12
 */

import client from '../../../client';
import { checkLoginState } from '../../users/users.utils';
import { sortSkillsbyPosition } from '../posts.utils';


export default {
    Mutation: {
        createPost: checkLoginState(
            async (_, { title, description, skills }, { loggedInUser }) => {
                try {
                    if (!skills) return null;
                    // 게시글을 생성하고 작성 User와 connect된다.

                    const [frontendSkills, backendSkills, appSkills] = sortSkillsbyPosition(skills, true);

                    const post = await client.post.create({
                        data: {
                            title,
                            description,
                            user: {
                                connect: {
                                    id: loggedInUser.id
                                }
                            },
                            frontends: {
                                connect: [
                                    ...frontendSkills
                                ]
                            },
                            backends: {
                                connect: [
                                    ...backendSkills
                                ]
                            },
                            apps: {
                                connect: [
                                    ...appSkills
                                ]
                            }
                        }
                    });

                    return post
                } catch {
                    return null
                }
            }
        )
    }
}