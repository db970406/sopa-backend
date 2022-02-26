/**
 * 생성일 : 22.02.22
 * 수정일 : 22.02.23
 */

import client from '../../../client';
import { checkLoginState } from '../users.utils';

export default {
    Query: {
        seeMyInfo: checkLoginState(
            async (_, __, { loggedInUser }) => client.user.findUnique({
                where: { id: loggedInUser.id }
            })
        )
    }
}
