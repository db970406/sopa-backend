/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.12
 */

import client from "../../client";

export default {
    Query: {
        seePosts: async (_, { pagination, skills }) => {

            // Home에 게시글들을 나열할 때 pagination을 활용한다(page식을 쓸 것인지는 나중에 생각해보자)
            let frontendsArray = [];
            let backendsArray = [];
            let appsArray = [];
            if (skills) {
                const selectedSkillsArray = JSON.parse(skills)

                selectedSkillsArray.forEach(selectedSkill => {
                    if (selectedSkill.position === "frontend") {
                        frontendsArray.push({
                            frontends: {
                                some: {
                                    skill: selectedSkill.skill
                                }
                            }
                        })
                    }
                    else if (selectedSkill.position === "backend") {
                        backendsArray.push({
                            backends: {
                                some: {
                                    skill: selectedSkill.skill
                                }
                            }
                        })
                    }
                    else if (selectedSkill.position === "app") {
                        appsArray.push({
                            apps: {
                                some: {
                                    skill: selectedSkill.skill
                                }
                            }
                        })
                    }
                })
            }

            const resultsArray = [
                ...frontendsArray,
                ...backendsArray,
                ...appsArray
            ]

            const posts = await client.post.findMany({
                where: {
                    ...(skills && {
                        AND: [
                            ...resultsArray
                        ]
                    })
                },
                take: 20,
                skip: pagination
            })
            console.log("posts : ", posts)
            return posts
        }
    }
}