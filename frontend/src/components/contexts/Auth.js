import { createContext, useState, useContext, useEffect} from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext({}); 

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState({}); 
    const [token, setToken] = useState(localStorage.getItem("token") || null)
    const [error, setError] = useState("");

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]);

    const login = async (email,password) =>{
        try{
            const params = new URLSearchParams(); 
            params.append('username', email);       
            params.append('password', password);     
            const response = await axios.post("http://localhost:8000/token", params,
                {
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}, 
                }
            );

            const {access_token, id} = response.data;
            const decodedToken = jwtDecode(access_token); // Decodificando o token
            const user_id = decodedToken.sub;
            console.log("ID do usuário:", user_id);

            localStorage.setItem("token",access_token)
            localStorage.setItem("user_id", user_id);
            localStorage.setItem("user", JSON.stringify({email}));

            setToken(access_token); 
            setUser({email, id}); 

            return true; //login deu certo

        } catch (error) {
            console.error("Erro no login", error.response?.data || error.message);
            setError("Login falhou")

            return false;    
        }
    }; 
    

    const logout = () =>{
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");
        setToken(null)
        setUser(null)
    }; 

    const register = async (name, email, password, role) => {
        try {
            const response = await axios.post("http://localhost:8000/signup", {
                name,
                email,
                password,
                role,
            }, 
            {
                'Content-Type': 'application/json'
            }
        );
            const newUser = response.data;
            console.log("Usuário criado com sucesso:", newUser);
            return true; 
            
        } catch (error) {
            console.error("Erro no cadastro", error.response?.data || error.message);
            setError("Criar usuário falhou")
            return false;
        } 
    };
    
    return (
        <AuthContext.Provider value = {{user, setUser, token, login, logout, register, error}}>
            {children}
        </AuthContext.Provider>
    ); 
}; 

export const useAuth = () => {
    return useContext(AuthContext);
  };