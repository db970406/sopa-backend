/**
 * 생성일 : 22.02.15
 * 수정일 : 22.03.03
 */

export const sortSkillsbyPosition = (skills, isCreate) => {
    let frontendsArray = [];
    let backendsArray = [];
    let appsArray = [];
    const selectedSkillsArray = JSON.parse(skills)

    selectedSkillsArray.forEach(selectedSkill => {
        if (selectedSkill.position === "frontend") {
            frontendsArray.push({
                ...(isCreate ? {
                    name: selectedSkill.name
                } : {
                    frontends: {
                        some: {
                            name: selectedSkill.name
                        }
                    }
                })
            })
        }
        else if (selectedSkill.position === "backend") {
            backendsArray.push({
                ...(isCreate ? {
                    name: selectedSkill.name
                } : {
                    backends: {
                        some: {
                            name: selectedSkill.name
                        }
                    }
                })
            })
        }
        else if (selectedSkill.position === "app") {
            appsArray.push({
                ...(isCreate ? {
                    name: selectedSkill.name
                } : {
                    apps: {
                        some: {
                            name: selectedSkill.name
                        }
                    }
                })
            })
        }
    })

    return isCreate ? [
        frontendsArray,
        backendsArray,
        appsArray
    ] : [
        ...frontendsArray,
        ...backendsArray,
        ...appsArray
    ]
}

export const makeSortMethod = (howToSort) => {
    switch (howToSort) {
        case "new":
            return {
                createdAt: "desc"
            }
        case "likeCount":
            return {
                likes: {
                    _count: "desc"
                },
            }
        case "commentCount":
            return {
                comments: {
                    _count: "desc"
                },
            }
        case "readCount":
            return {
                readCount: "desc"
            }
    }
}