const ProfilePage = () => {
  const userType = 
    localStorage.getItem("userType");

  const username = 
    localStorage.getItem("username");


  return (
    <div>
        <h1>Perfil</h1>

        <p>
          <strong>Usuario:</strong>
          {username}
        </p>

        <p>
          <strong>Email:</strong>
          usuario@test.com
        </p>

        <p>
          <strong>Rol:</strong>
          {userType === "guest"
            ? "Invitado"
            : "Usuario"}
        </p>
    </div>
  );
};

export default ProfilePage;