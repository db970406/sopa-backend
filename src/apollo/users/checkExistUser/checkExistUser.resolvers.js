/**
 * 생성일 : 22.03.06
 * 수정일 : ------
 */

import client from '../../../client'

export default {
    Mutation: {
        checkExistUser: async (_, { name, email }) => {
            try {
                // Unique 항목인 요소들에 대해 유일한지 검사
                const isUnique = await client.user.count({
                    where: {
                        OR: [{ name }, { email }]
                    }
                })
                if (isUnique) throw new Error("이미 존재하는 아이디 혹은 이메일입니다.")
                return {
                    ok: true
                }
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                }
            }
        }
    }
}