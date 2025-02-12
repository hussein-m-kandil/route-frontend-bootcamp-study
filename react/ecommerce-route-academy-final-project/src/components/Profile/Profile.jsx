import { Link, useOutletContext } from 'react-router-dom';
import { SIGNOUT_PATH } from '../../App';
import PageTitle from '../../PageTitle';

function Profile() {
  const { authData, updating } = useOutletContext();

  return (
    <>
      <PageTitle pageTitle={authData.user.name} />
      <section className="text-center mt-4 mb-8">
        <h2 className="font-bold text-xl">{authData.user.name}</h2>
        <p className="text-sm text-gray-700 font-light">
          {authData.user.email}
        </p>
        <p className="text-center text-xs font-light underline my-1">
          {updating ? (
            <span className="text-gray-400">Sign out</span>
          ) : (
            <Link
              to={SIGNOUT_PATH}
              replace={true}
              className="text-blue-700 m-0 active:text-black visited:text-purple-700"
            >
              Sign out
            </Link>
          )}
        </p>
      </section>
    </>
  );
}

export default Profile;
