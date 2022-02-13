import { useContext, useRef, memo } from 'react';
import Modal from 'react-modal';
import { StateContext, DispatchContext } from '../../context/notes-context';
import database from '../../firebase/firebase';

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
    >
      <p> Lutfen Kullanici adi giriniz </p>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input placeholder="Kullanici adi giriniz" id="name" ref={nameRef} required />
        <button> Submit </button>
      </form>
    </Modal>
  );
};

export default memo(ModalName);
