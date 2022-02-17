/**
 * 생성일 : 22.02.16
 * 수정일 : ------
 */

import express from "express";
import { githubLogin, kakaoLogin, naverLogin } from '../controller/socialLoginController';

const socialLoginRouter = express.Router();

socialLoginRouter.post("/github", githubLogin);

socialLoginRouter.post("/naver", naverLogin);

socialLoginRouter.post("/kakao", kakaoLogin);
export default socialLoginRouter;