import { SignedOut, SignInButton, SignedIn, UserButton,useAuth,useUser} from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function Header() {
  const {isSignedIn,getToken}=useAuth();
  const {user,isLoaded}=useUser();
  const navigate=useNavigate();

  useEffect(()=>{
    //check is user signin is success
    if(!isSignedIn  || !isLoaded) return ;
    //chheck user in backend
    const checkUserAndNavigate=async()=>{
      try{
        //get token shared by clerk
        let token = await getToken();
        console.log("Token:", token);
        //make http get req to check user
        let res= fetch('http://localhost:4000/user-api/me',{
          headers:{
            Authorisation:`Bearer ${token}`
          }
        })

        let data=(await res).json(); 

        //first time user login
        if(data.firstLogin===true){
          //navigate to role selection component
          navigate("/role-selection");
          return;
        }
        //get role of existing user
        let role=data.payload.role;
        //if user 
        if(role==="USER"){
          navigate("/user-dashboard")
        }
        else{
          navigate("/author-dashboard")
        }
        
      }catch(err){}
    }

  },[])
    
  return (
    <nav className="navbar navbar-light bg-light px-4">
      <a className="navbar-brand fw-bold" href="/">BlogApp</a>
    <div>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
    </nav>
  );
}

export default Header;