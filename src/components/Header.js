import { useContext } from 'react';
import NoteContext from '../context/notes-context';
import { history } from '../routers/AppRouter';
import { startLogOut } from '../actions/auth';

const Header = () => {
  const { state, dispatch } = useContext(NoteContext);
  const uid = state.filters.uid;
  const name = state.private.personal.name;

  const logOut = () => {
    startLogOut().then(() => {
      dispatch({ type: 'SET_ID', uid: '' });
    });
  };

  return (
    <div className="header">
      {uid !== '' ? (
        <div className="header__container">
          {history.location.pathname.includes(`/myPage/${uid}`) ? (
            <button className="btn" onClick={() => history.push('/')}>
              🏠
            </button>
          ) : (
            <button className="btn" onClick={() => history.push(`/myPage/${uid}`)}>
              MyPage
            </button>
          )}
          <h2>Hosgeldiniz {name}</h2>
          <button className="btn btn--logout" onClick={logOut}>
            LogOut
          </button>
        </div>
      ) : (
        <button className="btn btn--login" onClick={() => history.push('/loginPage')}>
          Login
        </button>
      )}
    </div>
  );
};

export { Header as default };
