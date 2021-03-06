/**
 * 생성일 : 22.02.07
 * 수정일 : 22.03.03
 */

import client from '../../../client';
import { makeSortMethod, sortSkillsbyPosition } from '../posts.utils';

export default {
    Query: {
        seePosts: async (_, { offset, skills, howToSort = "new" }) => {
            // Home에 게시글들을 나열할 때 offset을 활용한다(page식을 쓸 것인지는 나중에 생각해보자)
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
                take: 6,
                skip: offset,
                orderBy: makeSortMethod(howToSort)
            })

            return posts
        }
    }
}