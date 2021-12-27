import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { deletedItems } from '../actions/init';

const ModalDelete = () => {
  const [isOpen, setIsOpen] = useState(false);
  const deletedItem = deletedItems[0];

  useEffect(() => {
    if (deletedItems.length !== 0) {
      setIsOpen(true);
    }
  }, [deletedItem]);

  const message = (
    <div>
      <p>Katildiginiz aktivite/ler kaldirilmistir</p>
      <p> Listenizden dusurulmus olup arsivinize not edilmistir</p>
      {deletedItems.map((item) => (
        <p key={item.noteKey + item.name + item.item}>
          {item.name} - {item.item} / {item.noteKey}
        </p>
      ))}
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel="Deleted Modal"
      appElement={document.getElementById('root')}
    >
      {message}
      <button onClick={() => setIsOpen(false)}> Tamam </button>
    </Modal>
  );
};

export { ModalDelete as default };
