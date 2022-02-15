/**
 * 생성일 : 22.02.15
 * 수정일 : ------
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
                    skill: selectedSkill.skill
                } : {
                    frontends: {
                        some: {
                            skill: selectedSkill.skill
                        }
                    }
                })
            })
        }
        else if (selectedSkill.position === "backend") {
            backendsArray.push({
                ...(isCreate ? {
                    skill: selectedSkill.skill
                } : {
                    backends: {
                        some: {
                            skill: selectedSkill.skill
                        }
                    }
                })
            })
        }
        else if (selectedSkill.position === "app") {
            appsArray.push({
                ...(isCreate ? {
                    skill: selectedSkill.skill
                } : {
                    apps: {
                        some: {
                            skill: selectedSkill.skill
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