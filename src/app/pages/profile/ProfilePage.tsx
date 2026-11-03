const ProfilePage = () => {
  const userType = 
    localStorage.getItem("userType");

  const username = 
    localStorage.getItem("username");


  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1>Perfil</h1>

        <div className="profile-info">
          <span>Usuario:</span>
          <span>{username}</span>
        </div>

        <div className="profile-info">
          <span>Email:</span>
          <span>usuario@test.com</span>
        </div>

        <div className="profile-info">
          <span>Rol:</span>
          <span>{userType === "guest"
            ? "Invitado"
            : "Usuario"}</span>
        </div>
      </div>  
    </div>
  );
};

export default ProfilePage;