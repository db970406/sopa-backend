/**
 * 생성일 : 22.02.07
 * 수정일 : 22.02.16
 */

// 메인 서버

import { ApolloServer } from "apollo-server-express"
import express from "express"
import morgan from "morgan"
import cors from "cors"
import socialLoginRouter from './express/router/socialLoginRouter';
import { getUser } from './apollo/users/users.utils';
import { schema } from './schema';

async function startApolloServer() {
    const apolloServer = new ApolloServer({
        schema,
        context: async ({ req }) => {
            return {
                loggedInUser: await getUser(req.headers.token)
            }
        }
    });

    // 실제 배포한 프론트 사이트 추가필요
    const safeSiteList = [
        'https://sopa.life',
    ];

    const corsOptions = {
        origin: function (origin, callback) {
            const isSafeSiteListed = safeSiteList.indexOf(origin) !== -1;
            callback(null, isSafeSiteListed);
        },
        credentials: true
    }

    const PORT = process.env.PORT;
    const app = express();
    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(morgan("tiny"));
    app.use("/sociallogin", socialLoginRouter)
    await apolloServer.start();
    apolloServer.applyMiddleware({ app });

    const inLocal = `🚀 Server ready at http://localhost:4000`;
    const inProduction = `🚀 Server ready at https://sopa.life`;
    app.listen(PORT, () => console.log(process.env.NODE_ENV === "production" ? inProduction : inLocal));
}

startApolloServer()