/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

import client from '../../client'
import bcrypt from "bcrypt"

export default {
    Mutation: {
        createUser: async (_, { name, email, password }) => {
            try {
                // Unique 항목인 요소들에 대해 유일한지 검사
                const isUnique = await client.user.count({
                    where: {
                        OR: [{ name }, { email }]
                    }
                })
                if (isUnique) throw new Error("이미 존재하는 아이디 혹은 이메일입니다.")

                // 비밀번호 보안을 위한 bcrypt hashing
                const hashingPW = await bcrypt.hash(password, 10)

                await client.user.create({
                    data: {
                        name,
                        email,
                        password: hashingPW
                    }
                })
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