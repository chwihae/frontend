import { useParams } from 'react-router-dom';

const useGetPostId = () => {
  const params = useParams();
  const postId = Number(params.id);

  return { postId };
};

export default useGetPostId;
