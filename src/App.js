import './App.css';
import { useState, useRef} from 'react';
import * as yup from 'yup';

// import { checkEmail } from './utils/checkEmail';
// import { checkPassword } from './utils/checkPassword';
import { comparePasswords } from './utils/comparePasswords';

const sendFormData = (formData) => {
  console.log(formData);
};

const emailSchema = yup
  .string()
  .matches(
    /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
    'Неверный адрес e-mail' 
  );

const passwordSchema = yup
  .string()
  .matches (
    /^\w+[!$~#&]/,
    'Пароль должен содержать буквы, цифры и спецсимволы'
  )
  .min(8, 'Длина пароля не должна быть менее 8 символов');

  const validateField = (schema, value) => {
    let errMessage = null;

    try {
      schema.validateSync(value);
    } catch ({ errors }) {
        errMessage = errors
            .reduce((message, error) => message + error + 'n', '')
            .trim();
    };

    return errMessage;
  };

 


function App() {
  const [password, setPassword] = useState('');
  const [password_repeated, setPasswordRepeated] = useState('');
  const [email, setEmail] = useState('');
  const [errMessage, setErrMessage] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const submitButtonRef = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    sendFormData({ email, password });
  };

  const onBlurEmail = ({ target }) => {
    const newError = validateField(emailSchema, target.value);

    setErrMessage(newError);
  };

  const onBlurPassword = ({ target }) => {
    const newError = validateField(passwordSchema, target.value);

    setErrMessage(newError);
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        {errMessage && <div className="error-msg">{errMessage}</div>}
        <input 
            className='input-field'
            name="email"
            type="email"
            placeholder="Почта"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            // onBlur={({target}) => checkEmail(target.value, setIsValid, setErrMessage)}
            onBlur={onBlurEmail}
        />
        <input
            className='input-field'
            name="password"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            // onBlur={({target}) => checkPassword(target.value, setIsValid, setErrMessage)}
            onBlur={onBlurPassword}
        />    
        <input
            className='input-field'
            name="password_repeated"
            type="password"
            placeholder="Повторно введите пароль"
            value={password_repeated}
            onChange={({ target }) => setPasswordRepeated(target.value)}
            onBlur={({ target }) => comparePasswords(target.value, password, setIsValid, setErrMessage, submitButtonRef)}
            onKeyDown={(e) => { 
              if (e.key === "Enter") 
              submitButtonRef.current.focus();
              }} 
        />
        <button 
          ref={submitButtonRef}
          className="button" 
          type="submit" 
          disabled={!isValid}>Зарегистрироваться </button>
        </form>
    </div>
  );
}

export default App;
