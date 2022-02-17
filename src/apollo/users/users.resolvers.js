/**
 * 생성일 : 22.02.07
 * 수정일 : ------
 */

export default {
    User: {
        isMe: ({ id }, _, { loggedInUser }) => loggedInUser?.id === id
    }
}