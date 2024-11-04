import { auth } from "@/firebase/firebase.config";
import { setLoading, setUser } from "@/redux/features/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children }: { children: ReactNode }) => {
    const {user, loading} = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(setLoading(true))
        onAuthStateChanged(auth, (user) => {
          if (user) {
            dispatch(setUser(user.email))
            dispatch(setLoading(false))
          } else {
             dispatch(setLoading(false));
          }
        });
    },[dispatch])
  if (!user) {
    return <Navigate to={'/login'} />;
  }
  return children;
};

export default PrivateRoute