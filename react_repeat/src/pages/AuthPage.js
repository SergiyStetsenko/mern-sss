import { React, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);
  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    window.M.updateTextFields();
  });

  const registerHanlker = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      message(data.message);
    } catch (error) {}
  };
  const loginHanlker = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (error) {}
  };
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Сократи ссылку</h1>
        <div className="card  blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div className="">
              <label htmlFor="email">First email</label>
              <input
                placeholder="email..."
                id="email"
                type="text"
                name="email"
                value={form.email}
                onChange={changeHandler}
              />
            </div>
            <div className="">
              <label htmlFor="password">First password</label>
              <input
                placeholder="password"
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={changeHandler}
              />
            </div>
          </div>

          <div className="card-action">
            <button
              className="btn yellow darken-4 "
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHanlker}
            >
              Войти
            </button>
            <button
              className="btn grey  lighten-1 black-text"
              onClick={registerHanlker}
              disabled={loading}
            >
              Регистрация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
