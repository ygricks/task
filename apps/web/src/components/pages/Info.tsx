import { useAuth } from '../../context/AuthContext';

export const Info = () => {
  const { isLoading, user } = useAuth();
  
  if (isLoading) return <p>Loading...</p>;


  return <div>
    {user ? (

      <p>Logged in as {JSON.stringify(user).slice(1, -1)}</p>
    ) : (
      <>
        <p>You are not logged in.</p>
      </>
    )}
  </div>
}
