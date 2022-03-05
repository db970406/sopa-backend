/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.18
 */

import client from '../../../client';
import { checkLoginState } from '../../users/users.utils';
import { sortSkillsbyPosition } from '../posts.utils';


export default {
    Mutation: {
        createPost: checkLoginState(
            async (_, { title, description, skills, openChatLink }, { loggedInUser }) => {
                try {
                    if (!skills) throw new Error("스킬을 반드시 하나 이상 선택해주세요!");
                    // 게시글을 생성하고 작성 User와 connect된다.
                    console.log(skills)
                    const [frontendSkills, backendSkills, appSkills] = sortSkillsbyPosition(skills, true);
                    console.log(frontendSkills, backendSkills, appSkills);
                    const post = await client.post.create({
                        data: {
                            title,
                            description,
                            openChatLink,
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
                    console.log(post)
                    return {
                        ok: true,
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