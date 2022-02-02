async function checkUser(isuId, token) {
    const link = 'https://mycandidate.onti.actcognitive.org/questionnaires/auth/check_user'

    const body = {
        isu_id: Number.parseInt(isuId),
        token: token
    }
    const result = await fetch(link, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    const status = await result.json()
    return status
}

async function checkLocalUser() {
    const isuId = localStorage.getItem('id')
    const token = localStorage.getItem('token')
    if (isuId && token) {
        return true
    } else {
        return false
    }
}

async function getUserData(isu_id) {
    const link = 'https://mycandidate.onti.actcognitive.org/questionnaires/backend/get_user_info';
    const data = {
        "id": isu_id
    };

    const body = {
        method: 'POST',
        body: JSON.stringify(data)
    };

    const response = await fetch(link, body)
    const userData = await response.json()
    localStorage.setItem("name", userData.name)
    localStorage.setItem("surname", userData.surname)

}

export { checkUser, checkLocalUser, getUserData }