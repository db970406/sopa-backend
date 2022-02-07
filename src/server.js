/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

// 메인 서버

import { ApolloServer } from "apollo-server"
import { schema } from './schema';
import { getUser } from './users/users.utils';

const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.token)
        }
    }
})

const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`서버가 ${PORT} 포트에 생성되었습니다.`))