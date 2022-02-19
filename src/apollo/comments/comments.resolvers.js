/**
 * 생성일 : 22.02.19
 * 수정일 : ------
 */

import client from '../../client';

export default {
    Comment: {
        user: ({ userId }) => client.user.findUnique({ where: { id: userId } }),
    }
}