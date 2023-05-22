import React from 'react';
import useForm from '../hooks/useForm';

const Login = ({loginUser, errorMessage}) => {

  const { form, handleChange } = useForm({
    email: "",
    password: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(form);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <p className="auth__error">{errorMessage}</p>
      <form onSubmit={handleSubmit} className="auth__form">
        <label htmlFor="email" className="auth__form-field">
          <input 
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            className="auth__input login__input_type_email"
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
            className="auth__input login__input_type_password"
            value={form.password}
            required
            onChange={handleChange}
          />
          <span className="auth__input-error password-error"></span>
        </label>
        <button type="submit" aria-label="Войти" className="auth__form-submit">
          Войти
        </button>
      </form>
    </section>
  )
}

export default Login;