/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

import client from '../../client';

export default {
    Query: {
        seeUser: (_, { name }) => client.user.findUnique({ where: { name } })
    }
}