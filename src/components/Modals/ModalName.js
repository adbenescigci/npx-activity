import { useContext, useRef, memo } from 'react';
import Modal from 'react-modal';
import { StateContext, DispatchContext } from '../../context/notes-context';
import database from '../../firebase/firebase';

import style from '../../utils/modalStyle';

const ModalName = ({ onCloseModal }) => {
  const nameRef = useRef('');
  const { dispatch_private } = useContext(DispatchContext);
  const { state_filters } = useContext(StateContext);

  const id = state_filters.uid;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await database
      .ref()
      .child('private/' + id + '/personal')
      .set({ name: nameRef.current.value });

    dispatch_private({ type: 'PRIVATE_NAME', name: nameRef.current.value });
    onCloseModal();
  };

  return (
    <Modal
      isOpen={true}
      contentLabel="Private Name Modal"
      appElement={document.getElementById('root')}
      style={style}
      className="modal modal--name"
    >
      <p> Lutfen Kullanici adi giriniz </p>
      <form className="modal-form" onSubmit={handleSubmit}>
        <input placeholder="name" id="name" ref={nameRef} required />
        <button className="btn btn--big"> Submit </button>
      </form>
    </Modal>
  );
};

export default memo(ModalName);
