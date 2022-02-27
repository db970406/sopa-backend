/**
 * 생성일 : 22.02.27
 * 수정일 : ------
 */

import client from '../../../client';
import { sortSkillsbyPosition } from '../posts.utils';

export default {
    Query: {
        seePostsCount: async (_, { skills }) => {

            let resultsArray = [];
            if (skills) {
                resultsArray = sortSkillsbyPosition(skills)
            }

            const postsCount = await client.post.count({
                where: {
                    ...(skills && {
                        AND: [
                            ...resultsArray
                        ]
                    })
                }
            })

            return {
                count: postsCount
            }
        }
    }
}