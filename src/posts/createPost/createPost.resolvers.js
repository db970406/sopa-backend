/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.12
 */

import client from '../../client';
import { checkLoginState } from '../../users/users.utils';

export default {
    Mutation: {
        createPost: checkLoginState(
            async (_, { title, description, skills }, { loggedInUser }) => {
                try {
                    // 게시글을 생성하고 작성 User와 connect된다.
                    const post = await client.post.create({
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

                    const parsedSkillsArray = JSON.parse(skills);
                    parsedSkillsArray.map((parsedSkill) => {
                        if (parsedSkill.position === "frontend") {
                            console.log(parsedSkill.skill)
                        }
                    })

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