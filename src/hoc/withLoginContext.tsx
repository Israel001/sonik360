import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/appcontext';

const withLoginContext = (
  Component: React.FC<any>,
  redirectTo: string = '/',
) => {
  return () => {
    const { isLoggedIn } = useAppContext();
    const navigate = useNavigate();

    if (!isLoggedIn) {
      navigate(`/login?redirectTo=${redirectTo}`);
    }

    return <Component />;
  };
};

export default withLoginContext;
