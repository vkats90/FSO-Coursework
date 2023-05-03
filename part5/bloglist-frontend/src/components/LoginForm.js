const LoginForm = ({
  username,
  password,
  handleUsername,
  handlePassword,
  handleLogin,
}) => (
  <div>
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          name="Username"
          value={username}
          onChange={handleUsername}
        />
      </div>
      <div>
        password
        <input
          type="password"
          name="Password"
          value={password}
          onChange={handlePassword}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
);

export default LoginForm;
