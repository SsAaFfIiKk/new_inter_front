async function checkUser (authorId, type, token) {
    const link = 'https://mycandidate.onti.actcognitive.org/interview_back/check_user'
    const body = {
        author_id: Number.parseInt(authorId),
        id_type: type,
        token: token
    }

    const result = await fetch(link, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
    const status = await result.json()
    return status
}

async function checkLocalUser() {
    const isuId = localStorage.getItem('id')
    const token = localStorage.getItem('token')
    if (isuId && token) {
        return await checkUser(isuId, token)
    } else {
        return false
    }
}

async function getUserData(author_id, id_type) {
    const link = 'https://mycandidate.onti.actcognitive.org/interview_back/get_user_info';
    const data = {
        "author_id": author_id,
        "id_type": id_type
    };

    const body = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const response = await fetch(link, body)
    const userData = await response.json()
    localStorage.setItem("fio", userData)

}

export {checkUser, checkLocalUser, getUserData}