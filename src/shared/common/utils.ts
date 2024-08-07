
export function getOnlyParams(params: any[], my_object: object) {
    return params.reduce((obj, param) => {
        if (typeof param === 'string') obj[param] = my_object[param]
        return obj
    }, {})
}

export function getPublicUserData(my_object: object, fullInfo: boolean = false) {
    return getOnlyParams([
        'id', 'username', 'phone', 'email',
        ...(fullInfo ? ['banned', 'banReason', 'isActivated', 'activationLink', 'createdAt', 'updatedAt'] : [])
    ], my_object);
}

export function excludeParams(params: string[], newValues: object, defaultObj = null) {
    return Object.keys(newValues).reduce((obj, param) => {
        if (!params.includes(param)) {
            if (defaultObj === null) {
                obj[param] = newValues[param]
            }
            else {
                defaultObj[param] = newValues[param]
            }
        }
        return defaultObj ?? obj
    }, {})
}