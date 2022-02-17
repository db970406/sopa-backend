/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.15
 */

import jwt from "jsonwebtoken";
import client from '../../client';

// header에 실려있는 로그인한 유저의 토큰을 가져와서 payload를 추출한 다음 해당 User 데이터를 반환함
export const getUser = async (token) => {
    try {
        if (!token) return null;

        // payload 추출
        const { id } = await jwt.verify(token, process.env.TOKEN_PRIVATE_KEY);

        // payload에 실려 있는 id를 토대로 User 정보를 찾아서 반환
        const user = await client.user.findUnique({ where: { id } });
        return user;
    } catch {
        return null;
    }
}

// 로그인이 필요한 resolver들을 사용할 때 로그인 상태를 체크함
export const checkLoginState = (resolver) => (root, args, ctx, info) => {
    // context 부분에 loggedInUser가 없는 비로그인 상태 시 접근 불가하게 함
    if (!ctx.loggedInUser) {
        const { operation, fieldName } = info

        if (operation.operation === "query") return null;
        else if (fieldName.includes("create")) return null;

        return {
            ok: false,
            error: "로그인이 필요합니다."
        }
    }
    return resolver(root, args, ctx, info);
}