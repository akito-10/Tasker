import { useEffect } from "react";
import { auth } from "src/firebase/firebase";
import { login, logout } from "src/features/userSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

export const useWatchIsLogin = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // ログイン状態を監視
    const unSub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // 認証状態にある場合の処理
        dispatch(
          login({
            uid: authUser.uid,
            photoUrl: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
      } else {
        // 認証状態にない場合の処理
        dispatch(logout());
        router.push("/");
      }
    });

    return () => unSub();
  }, [dispatch]);
};
