import { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();
    handleLogin({ username, password });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <div>
          username
          <input
            type="text"
            name="Username"
            value={username}
            onChange={({ target }) => {
              setUsername(target.value);
            }}
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="Password"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
