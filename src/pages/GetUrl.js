import React, { useState } from "react";


export const GetUrl = () => {

    const [err, setErr] = useState(false);
    const [isu_id, setId] = useState();
    const [url, setUrl] = useState();
    const [messsage, setMess] = useState();

    const check_id = (e) => {
        e.preventDefault();
        const check_id_url = "https://mycandidate.onti.actcognitive.org/questionnaires/auth/check_isu_id"

        const data = {
            "isu_id": isu_id
        }

        const body = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };

        if (isu_id) {
            fetch(check_id_url, body)
                .then(res => res.json())
                .then(out => {
                    if (!out) {
                        setMess('У данного id нет доступа');
                        setErr(true);
                    }
                    else { setErr(false); get_personal_url() };
                });
        }
    }

    const get_personal_url = () => {
        const get_url = "https://mycandidate.onti.actcognitive.org/questionnaires/auth/get_personal_url"

        const data = {
            "isu_id": isu_id
        }

        const body = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };

        fetch(get_url, body)
            .then(res => res.json())
            .then(out => { setUrl(out) });

    }

    return (
        <div>
            <form className="loginform" onSubmit={check_id}>
                <header lassName={err ? 'warning warning-active' : 'warning'}>
                    {err && (
                        <div>
                            {messsage}
                        </div>
                    )}
                </header>
                <div className="group">
                    <label htmlFor="">Isu id</label>
                    <input
                        type="number"
                        name="isu_id"
                        value={isu_id}
                        onChange={e => setId(e.target.value)}
                    />
                </div>
                <div className="group">
                    <button
                        button className="loginb" 
                        type="submit">Получить ссылку
                    </button>
                </div>
                <div className="group">
                    {url}
                </div>
            </form>
        </div>
    )
}