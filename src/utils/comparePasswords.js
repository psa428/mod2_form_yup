export function comparePasswords(str1, str2, setIsValid, setErrMessage, buttonRef){
    //  Сравнение паролей
    let newError = null;

    if (str1 === str2) {
        setIsValid(true);
        
    }    
    else 
        newError = 'Пароли не совпадают';
        
    if (newError) {
        setErrMessage(newError);
        setIsValid(false);
    }   
        
    

}