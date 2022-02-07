/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

import client from '../../client';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
    Mutation: {
        login: async (_, { email, password }) => {
            try {
                // 존재하는 사용자인지 여부 체크
                const user = await client.user.findUnique({ where: { email } });
                if (!user) throw new Error("존재하지 않는 이메일입니다.");

                // 패스워드 일치 여부
                const checkPW = await bcrypt.compare(password, user.password);
                if (!checkPW) throw new Error("비밀번호가 일치하지 않습니다.");

                // jwt 토큰 생성
                const token = await jwt.sign({ id: user.id }, process.env.TOKEN_PRIVATE_KEY);

                return {
                    ok: true,
                    token
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message
                };
            }
        }
    }
}