export function checkEmail(str, setIsValid, setErrMessage){
/*
*   Проверка адреса  электронной почты
*/
    const regexp = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

    if (regexp.test(str))
        setErrMessage(null);
    else {
        setErrMessage('Неверный e-mail');
        setIsValid(false);
    }    
    
};