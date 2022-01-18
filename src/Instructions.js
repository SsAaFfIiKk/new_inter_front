import React from 'react'


class Instructions {

    static shortInstruction() {
        return (
            <>
                <p>
                    Если фон и индикатор фиолетого цвета, отвечайте честно.
                </p>
                <p>
                    Если фон и индикатор красного цвета, ван нужно солгать.
                </p>
            </>
        )
    }

    static longInstruction() {
        return (
            <div>
                <p>
                    Целью онлайн-интервью является уточнение Ваших компетенций для последующего формирования
                    команд исполнителей научных проектов.
                </p>
                <p>
                    В ходе него Вам будет предложен ряд вопросов, при составлении которых основное внимание уделялось
                    тем темам, которые наиболее существенны для работы в команде. Вопросы разбиты на 3 блока.
                </p>
                <ol>
                    <li>
                        <span>Сфера профессиональных компетенций. </span>
                        Данный блок вопросов оценивает осознание собственного профессионализма и возможность
                        эффективно представлять его другим.
                    </li>
                    <li>
                        <span>Работа в команде. </span>
                        Данный блок оценивает желание в полной мере участвовать в работе в команде, готовность
                        внести эффективный вклад в работу команды.
                    </li>
                    <li>
                        <span>Коммуникация. </span>
                        Данный блок оценивает способность выражать идеи или факты в ясной и убедительной манере.
                    </li>
                </ol>
                <p>
                    <span>
                        Ответы на вопросы должны быть искренними, содержательными и подкреплены аргументами
                        (фактами, примерами из Вашего личного опыта).
                    </span>
                </p>
                <p>
                    ВАЖНО: между указанными блоками будут вопросы, при ответе на которые необходимо сказать неправду.
                    Такие вопросы буду отмечены специальным красным индикатором с надписью <span>&#171;соврите&#187;</span>.
                    Необходимо дать ответ, в точности противоположный вашему мнению, и попытаться обосновать, почему же именно
                    так (т.е. говорить неправду в течение всего вопроса).

                </p>
                <p>
                    После нажатия кнопки <span>&#171;Начать интервью&#187;</span> появится окно, которое будет транслировать
                    видеозапись с Вашей камеры. Чуть ниже будет отражаться текущий вопрос, на который Вам необходимо ответить.
                    Внимательно прочитайте вопрос и когда будете готовы отвечать, нажмите кнопку <span>&#171;Начать ответ&#187;</span>.
                    После ответа на вопрос необходимо нажать на кнопку <span>&#171;Cледующий вопрос&#187;</span>, после чего появится
                    новый вопрос. После ответа на все вопросы появится кнопка <span>&#171;Завершить интервью&#187;</span>, по нажатию
                    на которую видеозапись ответа завершится.
                </p>
                <p>
                    <span>Технические требования к онлайн-интервью</span>
                </p>
                <ol>
                    <li>
                        В кадр должно полностью попадать Ваше лицо. Лицо должно быть отчетливо видно, камера должна
                        быть не сильно далеко от Вас. Изображение лица должно быть четким, строго в анфас.
                    </li>
                    <li>
                        Положение камеры. Вы должны находиться перпендикулярно камере, желательно чтобы камера
                        находилась на уровне глаз. В случае, если камера расположена сбоку от Вас, то после
                        прочтения ответа повернитесь в камеру и давайте ответ, глядя в ее объектив.
                    </li>
                    <li>
                        Качественное освещение. Направьте камеру так, чтобы не было засвеченных участков.
                        Уберите источники света в кадре (ими могут быть лампы, свет из окна).
                    </li>
                    <li>
                        Обстановка и внешний фон. Для прохождения видеоинтервью потребуется 15-20 минут,
                        выберите спокойное и комфортное место, чтобы Вас ничего не отвлекало
                        (шум, какие-то посторонние предметы и т.д.)
                    </li>
                </ol>
                <p>
                    Если у Вас остались вопросы, Вы заметили какие-то неточности в работе сервиса
                    или произошел технический сбой, пожалуйста, напишите об этом на адрес электронной почты &nbsp;
                    <a href="mailto:egor.aksamentov.96@mail.ru">egor.aksamentov.96@mail.ru</a>.
                </p>
                <p>
                    Спасибо за участие и помощь в создании помощника "Аватар". Успехов!
                </p>
            </div>
        )
    }
}

export default Instructions;