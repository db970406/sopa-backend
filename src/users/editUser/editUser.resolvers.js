/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

import client from '../../client';
import { checkLoginState } from '../users.utils';
import bcrypt from "bcrypt";

export default {
    Mutation: {
        editUser: checkLoginState(
            async (_, { name, password }, { loggedInUser }) => {
                try {
                    // 존재하는 아이디 여부 체크
                    if (name) {
                        const isUniqueName = await client.user.count({ where: { name } });
                        if (isUniqueName) throw new Error("이미 존재하는 아이디입니다.");
                    };

                    // 비밀번호 해싱
                    let hashingPW;
                    if (password) {
                        hashingPW = await bcrypt.hash(password, 10);
                    };

                    await client.user.update({
                        where: {
                            id: loggedInUser.id
                        },
                        data: {
                            name,
                            password: hashingPW
                        }
                    });

                    return {
                        ok: true
                    };
                } catch (error) {
                    return {
                        ok: false,
                        error: error.message
                    };
                }
            }
        )
    }
}