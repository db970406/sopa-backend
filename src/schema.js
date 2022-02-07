/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

// 모든 resolver들과 typeDefs를 하나로 묶어줄 schema 파일

import { loadFilesSync } from "@graphql-tools/load-files"
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge'
import { makeExecutableSchema } from '@graphql-tools/schema'

const loadResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.js`)
const loadTypeDefs = loadFilesSync(`${__dirname}/**/*.typeDefs.js`)

const resolvers = mergeResolvers(loadResolvers)
const typeDefs = mergeTypeDefs(loadTypeDefs)

export const schema = makeExecutableSchema({ resolvers, typeDefs })