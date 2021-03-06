/**
 * 생성일 : 22.02.16
 * 수정일 : ------
 */

import fetch from "node-fetch";
import client from '../../client';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const githubLogin = async (req, res) => {
    const { code } = req.body

    const baseUrl = "https://github.com/login/oauth/access_token"
    const config = {
        client_id: process.env.SOCIAL_GITHUB_KEY,
        client_secret: process.env.SOCIAL_GITHUB_SECRET,
        code
    }
    const params = new URLSearchParams(config).toString()

    const reqUrl = `${baseUrl}?${params}`
    const token = await (
        await fetch(reqUrl, {
            method: "POST",
            headers: {
                Accept: "application/json"
            }
        })
    ).json()

    if ("access_token" in token) {
        const { access_token } = token
        const apiUrl = "https://api.github.com"
        const userData = await (
            await fetch(`${apiUrl}/user`, {
                headers: {
                    Authorization: `token ${access_token}`
                }
            })
        ).json()
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers: {
                    Authorization: `token ${access_token}`
                }
            })
        ).json()

        const emailObj = emailData.find(email => email.primary === true && email.verified === true)
        const findUserEmail = await client.user.count({
            where: {
                email: emailObj.email
            }
        })

        let user;
        if (!findUserEmail && !user) {
            const hashPassword = await bcrypt.hash(String(Date.now()), 10)

            user = await client.user.create({
                data: {
                    name: userData.name || emailObj.email.split("@")[0],
                    socialLogin: "GITHUB",
                    email: emailObj.email,
                    password: hashPassword
                }
            })
        }
        user = await client.user.findUnique({
            where: {
                email: emailObj.email
            }
        })
        const jwtToken = await jwt.sign({ id: user.id }, process.env.TOKEN_PRIVATE_KEY)
        return res.json({ jwtToken })
    }
}

export const naverLogin = async (req, res) => {
    try {
        const { code } = req.body;

        const baseUrl = `https://nid.naver.com/oauth2.0/token`

        const config = {
            grant_type: "authorization_code",
            client_id: process.env.SOCIAL_NAVER_KEY,
            client_secret: process.env.SOCIAL_NAVER_SECRET,
            code,
            state: process.env.SOCIAL_NAVER_STATE
        }

        const params = new URLSearchParams(config).toString()
        const reqUrl = `${baseUrl}?${params}`

        const token = await (
            await fetch(reqUrl, {
                method: "POST",
            })
        ).json()

        if ("access_token" in token) {
            const { access_token } = token
            const apiUrl = "https://openapi.naver.com/v1/nid/me"

            const userData = await (
                await fetch(apiUrl, {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    },
                })
            ).json()

            const { response } = userData
            if (!response.email) throw new Error("이메일 수집 허용은 필수입니다.");
            else if (!response.nickname) throw new Error("별명 수집 허용은 필수입니다.");

            const findUserEmail = await client.user.count({
                where: {
                    email: response.email
                }
            })

            let user;
            if (!findUserEmail && !user) {
                const hashPassword = await bcrypt.hash(String(Date.now()), 10)
                await client.user.create({
                    data: {
                        name: response.nickname || response.email.split("@")[0],
                        socialLogin: "NAVER",
                        email: response.email,
                        password: hashPassword
                    }
                })
            }
            user = await client.user.findUnique({
                where: {
                    email: response.email
                }
            })

            const jwtToken = await jwt.sign({ id: user.id }, process.env.TOKEN_PRIVATE_KEY)
            return res.status(201).json({ jwtToken })
        }
    } catch (error) {
        return res.status(404).json({ error: error.message })
    }
}

export const kakaoLogin = async (req, res) => {
    const { code } = req.body
    const baseUrl = "https://kauth.kakao.com/oauth/token"

    const config = {
        grant_type: "authorization_code",
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: process.env.SOCIAL_KAKAO_CODE_REDIRECT,
        code
    }

    const params = new URLSearchParams(config).toString()

    const reqUrl = `${baseUrl}?${params}`

    const token = await (
        await fetch(reqUrl, {
            method: "POST",
            headers: {
                "Content-type": "application/x-www-form-urlencoded"
            }
        })
    ).json()

    if ("access_token" in token) {
        const { access_token } = token
        const apiUrl = `https://kapi.kakao.com`

        const userData = await (
            await fetch(`${apiUrl}/v2/user/me`, {
                method: "POST",
                headers: {
                    "Content-type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${access_token}`
                }
            })
        ).json()

        const { kakao_account } = userData

        const findUserEmail = await client.user.count({
            where: {
                email: kakao_account.email
            }
        })
        let user;
        if (!findUserEmail && !user) {
            const hashPassword = await bcrypt.hash(String(Date.now()), 10)
            await client.user.create({
                data: {
                    name: kakao_account.profile.nickname || kakao_account.email.split("@")[0],
                    socialLogin: "KAKAO",
                    email: kakao_account.email,
                    password: hashPassword
                }
            })
        }
        user = await client.user.findUnique({
            where: {
                email: kakao_account.email
            }
        });

        const jwtToken = await jwt.sign({ id: user.id }, process.env.TOKEN_PRIVATE_KEY)
        return res.status(200).json({ jwtToken })
    }
}