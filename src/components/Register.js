import React from 'react';
import { Link } from 'react-router-dom';
import useForm from '../hooks/useForm';

const Register = ({registerUser}) => {
  
  const { form, handleChange } = useForm({
    email: "",
    password: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(form);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <label htmlFor="email" className="auth__form-field">
          <input 
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            className="auth__input register__input_type_email"
            value={form.email}
            required
            onChange={handleChange}
          />
          <span className="auth__input-error email-error"></span>
        </label>
        <label htmlFor="password" className="auth__form-field">
          <input 
            type="password"
            name="password"
            placeholder="Пароль"
            id="password"
            className="auth__input register__input_type_password"
            value={form.password}
            required
            onChange={handleChange}
          />
          <span className="auth__input-error password-error"></span>
        </label>
        <button type="submit" aria-label="Зарегистрироваться" className="auth__form-submit">
          Зарегистрироваться
        </button>
      </form>
      <div className="auth__question-block">
        <p className="auth__login-question">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="auth__login-link auth__login-question">Войти</Link>
      </div>
    </section>
  )
}

export default Register;