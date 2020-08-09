export const getEmailPage = (id: string) => {
    return `
    <a href="http://localhost:5000/activate/${id}">
        <i>Активировать аккаунт</i>
    </a>
  `
};

export const getActivatePage = (name: string) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Ликбез</title>
        </head>
        <body>
        <div>
            ${name}, ваш аккаунт активирован. Желаем вам успехов
        </div>
        </body>
        </html>
    `
};
