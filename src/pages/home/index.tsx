import useUser from '../../hooks/useUser';

export default function Home() {
  const user = useUser();
  return (
    <div>
      <h1>Welcome {user?.username}</h1>
    </div>
  );
}
