/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.27
 */

import client from '../../../client';
import { sortSkillsbyPosition } from '../posts.utils';

export default {
    Query: {
        seePosts: async (_, { offset, skills, howToArrangement = "new" }) => {
            // Home에 게시글들을 나열할 때 offset을 활용한다(page식을 쓸 것인지는 나중에 생각해보자)
            let resultsArray = [];
            if (skills) {
                resultsArray = sortSkillsbyPosition(skills)
            }

            const makeArrangement = () => {
                switch (howToArrangement) {
                    case "new":
                        return {
                            createdAt: "desc"
                        }
                    case "likeCount":
                        return {
                            likes: {
                                _count: "desc"
                            },
                        }
                    case "commentCount":
                        return {
                            comments: {
                                _count: "desc"
                            },
                        }
                    case "readCount":
                        return {
                            readCount: "desc"
                        }
                }
            }

            const posts = await client.post.findMany({
                where: {
                    ...(skills && {
                        AND: [
                            ...resultsArray
                        ]
                    })
                },
                take: 6,
                skip: offset,
                orderBy: makeArrangement()
            })

            return posts
        }
    }
}