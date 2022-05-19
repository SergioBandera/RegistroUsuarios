export const registro = async (registroUsuario) =>{
    await fetch("http://localhost:8080/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams(registroUsuario),
    });
}