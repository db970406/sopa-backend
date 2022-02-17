/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.15
 */

import client from '../../../client';
import { sortSkillsbyPosition } from '../posts.utils';

export default {
    Query: {
        seePosts: async (_, { pagination, skills }) => {
            // Home에 게시글들을 나열할 때 pagination을 활용한다(page식을 쓸 것인지는 나중에 생각해보자)
            let resultsArray = [];
            if (skills) {
                resultsArray = sortSkillsbyPosition(skills)
            }

            const posts = await client.post.findMany({
                where: {
                    ...(skills && {
                        AND: [
                            ...resultsArray
                        ]
                    })
                },
                take: 20,
                skip: pagination,
                orderBy: {
                    createdAt: "desc"
                }
            })
            return posts
        }
    }
}