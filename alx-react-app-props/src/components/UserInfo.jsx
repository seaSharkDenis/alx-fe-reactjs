import { useContext } from "react";
import { UserContext } from "./UserContext";

function UserInfo() {
  const userData = useContext(UserContext);
  return (
    <UserDetails userData={userData} />
  );
}

export default UserInfo;