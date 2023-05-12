import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/appcontext";

const preventPage = (
  Component: React.FC<any>,
) => {
  return () => {
    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();

    if (isLoggedIn) {
      navigate('/');
    }

    return <Component />;
  };
};

export default preventPage;
