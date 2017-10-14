const Initial_State={
  listItemActions:'',
  selectedItemActions:'',
  deletedItemActions:'',
};

export default function (state=Initial_State,action){
   console.log(action.type);
  switch (action.type) {
    case "List_Item":
      return {...state,listItemActions:action.payload};
      break;
    case "selected_Item":
        return {...state,selectedItemActions:action.payload};
        break;
    case "Edit_Item":
        return {...state,selectedItemActions:action.payload};
        break;
    case "Delete_Item":
        return {...state,deletedItemActions:action.payload};
        break;
    default:
      return state;
  };
};
