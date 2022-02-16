const privateReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_MY_NOTES':
      return {
        ...state,
        items: action.myItems.items,
        archive: action.myItems.archive,
        deleted: action.myItems.deleted,
      };
    case 'DELETE_ALERT':
      return {
        ...state,
        deleted: undefined,
      };
    case 'VIEW_NOTE':
      return {
        ...state,
        view: action.view,
      };
    case 'PRIVATE_NAME':
      return {
        ...state,
        personal: { ...state.personal, name: action.name },
      };
    case 'SHOULD_DELETE':
      return {
        ...state,
        personal: { ...state.personal, delete: true },
      };
    case 'ADD_MY_NOTE':
      return {
        ...state,
        items: [...state.items, action.item],
      };
    case 'EDIT_MY_NOTE':
      return {
        ...state,
        items: action.editedItems,
      };
    case 'ADD_MY_ACT':
      return state;

    case 'REMOVE_MY_NOTE':
      const items = state.items.filter((item) => {
        return item.key !== action.key;
      });
      return {
        ...state,
        items,
      };
    case 'REMOVE_MY_NOTE_ALL':
      const itemsAll = state.items.filter((item) => {
        return item.noteKey !== action.key;
      });
      return {
        ...state,
        items: itemsAll,
      };
    case 'REMOVE_ARCHIVE_ITEM':
      const archive = state.archive.filter((item) => {
        return item.key !== action.key;
      });
      return {
        ...state,
        archive,
      };
    case 'REMOVE_ARCHIVE':
      return {
        ...state,
        archive: [],
      };

    default:
      return state;
  }
};

export { privateReducer as default };
