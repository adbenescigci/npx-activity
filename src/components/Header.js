import { useContext, memo } from 'react';
import { StateContext, DispatchContext } from '../context/notes-context';
import { history } from '../routers/AppRouter';
import { startLogOut } from '../actions/auth';

const Header = () => {
  const { state_filters, state_private } = useContext(StateContext);
  const { dispatch_filters } = useContext(DispatchContext);
  const uid = state_filters.uid;
  const name = state_private.personal.name;

  const logOut = () => {
    startLogOut().then(() => {
      dispatch_filters({ type: 'SET_ID', uid: '' });
    });
  };

  return (
    <div className="header">
      {uid !== '' ? (
        <div className="header__container">
          {history.location.pathname.includes(`/myPage/${uid}`) ? (
            <button className="btn" onClick={() => history.push('/')}>
              Home
            </button>
          ) : (
            <button className="btn" onClick={() => history.push(`/myPage/${uid}`)}>
              MyPage
            </button>
          )}
          <h1>
            Hosgeldiniz <span>{name}</span>
          </h1>
          <button className="btn btn--logout" onClick={logOut}>
            LogOut
          </button>
        </div>
      ) : (
        <div className="header__container header__container--noUser">
          <h1>Activity Select Web App</h1>
          <button className="btn btn--login" onClick={() => history.push('/loginPage')}>
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(Header);
