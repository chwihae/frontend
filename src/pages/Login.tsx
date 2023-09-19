import { useSearchParams } from 'react-router-dom';

const Login = () => {
  const [searchParams] = useSearchParams();
  const authorizeCode = searchParams.get('code');
  console.log(authorizeCode);
  return <></>;
};

export default Login;
