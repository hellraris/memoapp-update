export const intialState = {
  labelList: [],
  selectedLabel: null,
  labelErrorMessage:'',
  createdLabelFlg: false,
  updatedLabelFlg: false,
  deletedLabelFlg: false
};

// 라벨리스트 불러오기 액션
export const GET_LABEL_LIST_REQUEST = 'GET_LABEL_LIST_REQUEST';
export const GET_LABEL_LIST_SUCCESS = 'GET_LABEL_LIST_SUCCESS';
export const GET_LABEL_LIST_FAILURE = 'GET_LABEL_LIST_FAILURE';

// 라벨 불러오기 액션
export const GET_LABEL_REQUEST = 'GET_LABEL_REQUEST';
export const GET_LABEL_SUCCESS = 'GET_LABEL_SUCCESS';
export const GET_LABEL_FAILURE = 'GET_LABEL_FAILURE';

// 라벨작성 액션
export const CREATE_LABEL_REQUEST = 'CREATE_LABEL_REQUEST';
export const CREATE_LABEL_SUCCESS = 'CREATE_LABEL_SUCCESS';
export const CREATE_LABEL_FAILURE = 'CREATE_LABEL_FAILURE';

// 라벨수정 액션
export const UPDATE_LABEL_REQUEST = 'UPDATE_LABEL_REQUEST';
export const UPDATE_LABEL_SUCCESS = 'UPDATE_LABEL_SUCCESS';
export const UPDATE_LABEL_FAILURE = 'UPDATE_LABEL_FAILURE';

// 라벨지정 액션
export const ADD_LABEL_MEMOS_REQUEST = 'ADD_LABEL_MEMOS_REQUEST';
export const ADD_LABEL_MEMOS_SUCCESS = 'ADD_LABEL_MEMOS_SUCCESS';
export const ADD_LABEL_MEMOS_FAILURE = 'ADD_LABEL_MEMOS_FAILURE';

// 라벨삭제 액션
export const REMOVE_LABEL_REQUEST = 'REMOVE_LABEL_REQUEST';
export const REMOVE_LABEL_SUCCESS = 'REMOVE_LABEL_SUCCESS';
export const REMOVE_LABEL_FAILURE = 'REMOVE_LABEL_FAILURE';

// 라벨지정취소 액션
export const REMOVE_LABEL_MEMOS_REQUEST = 'REMOVE_LABEL_MEMOS_REQUEST';
export const REMOVE_LABEL_MEMOS_SUCCESS = 'REMOVE_LABEL_MEMOS_SUCCESS';
export const REMOVE_LABEL_MEMOS_FAILURE = 'REMOVE_LABEL_MEMOS_FAILURE';

// 라벨일괄지정취소 액션
export const REMOVE_ALL_LABEL_MEMOS_REQUEST = 'REMOVE_ALL_LABEL_MEMOS_REQUEST';
export const REMOVE_ALL_LABEL_MEMOS_SUCCESS = 'REMOVE_ALL_LABEL_MEMOS_SUCCESS';
export const REMOVE_ALL_LABEL_MEMOS_FAILURE = 'REMOVE_ALL_LABEL_MEMOS_FAILURE';

// 각종 초기화 액션
export const RESET_LABEL_LIST = 'RESET_LABEL_LIST';
export const RESET_SELECTED_LABEL = 'RESET_SELECTED_LABEL';
export const RESET_LABEL_ERROR_MESSAGE = 'RESET_LABEL_ERROR_MESSAGE';
export const RESET_CREATED_LABEL_FLG = 'RESET_CREATED_LABEL_FLG'
export const RESET_UPDATED_LABEL_FLG = 'RESET_UPDATED_LABEL_FLG';
export const RESET_DELETED_LABEL_FLG = 'RESET_DELETED_LABEL_FLG';

export const getLabelListAction = {
  type: GET_LABEL_LIST_REQUEST
};

export const createLabelAction = (title) => {
  return {
    type: CREATE_LABEL_REQUEST,
    data: { title: title }
  }
};

export const updateLabelAction = (label) => {
  return {
    type: UPDATE_LABEL_REQUEST,
    data: label
  }
};

export const getLabelAction = (id) => {
  return {
    type: GET_LABEL_REQUEST,
    data: id
  }
};

export const addLabelMemosAction = (addMemosData) => {
  return {
    type: ADD_LABEL_MEMOS_REQUEST,
    data: addMemosData
  }
};

export const removeLabelAction = (id) => {
  return {
    type: REMOVE_LABEL_REQUEST,
    data: id
  }
};

export const removeLabelMemosAction = (removeMemosData) => {
  return {
    type: REMOVE_LABEL_MEMOS_REQUEST,
    data: removeMemosData
  }
};

export const removeAllLabelMemosAction = (memoIds) => {
  return {
    type: REMOVE_ALL_LABEL_MEMOS_REQUEST,
    data: memoIds
  }
};

export const resetCreatedLabelFlg = {
  type: RESET_CREATED_LABEL_FLG
};

export const resetUpdatedLabelFlg = {
  type: RESET_UPDATED_LABEL_FLG
};

export const resetDeletedLabelFlg = {
  type: RESET_DELETED_LABEL_FLG
};

export const resetLabelErrorMessage = {
  type: RESET_LABEL_ERROR_MESSAGE
};

export const resetLabelList = {
  type: RESET_LABEL_LIST
};

export const resetSelectedLabel = {
  type: RESET_SELECTED_LABEL
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_LABEL_LIST_REQUEST: {
      return {
        ...state
      };
    }
    case GET_LABEL_LIST_SUCCESS: {
      return {
        ...state,
        labelList: action.data
      };
    }
    case GET_LABEL_LIST_FAILURE: {
      return {
        ...state,
        labelErrorMessage: '라벨리스트 불러오기에 실패하였습니다'
      };
    }
    case GET_LABEL_REQUEST: {
      return {
        ...state
      };
    }
    case GET_LABEL_SUCCESS: {
      return {
        ...state,
        selectedLabel: {
          _id: action.data._id,
          title: action.data.title
        }
      };
    }
    case GET_LABEL_FAILURE: {
      return {
        ...state,
        labelErrorMessage: '라벨 불러오기에 실패하였습니다'
      };
    }
    case CREATE_LABEL_REQUEST: {
      return {
        ...state
      };
    }
    case CREATE_LABEL_SUCCESS: {
      return {
        ...state,
        selectedLabel: action.data,
        createdLabelFlg: true
      };
    }
    case CREATE_LABEL_FAILURE: {
      return {
        ...state,
        labelErrorMessage: '라벨작성에 실패하였습니다'
      };
    }
    case UPDATE_LABEL_REQUEST: {
      return {
        ...state
      };
    }
    case UPDATE_LABEL_SUCCESS: {
      return {
        ...state,
        selectedLabel: action.data
      };
    }
    case UPDATE_LABEL_FAILURE: {
      return {
        ...state,
        labelErrorMessage: '라벨수정에 실패하였습니다'
      };
    }
    case ADD_LABEL_MEMOS_REQUEST: {
      return {
        ...state
      };
    }
    case ADD_LABEL_MEMOS_SUCCESS: {
      return {
        ...state,
        updatedLabelFlg: true
      };
    }
    case ADD_LABEL_MEMOS_FAILURE: {
      return {
        ...state,
        labelErrorMessage: '라벨지정에 실패하였습니다'
      };
    }
    case REMOVE_LABEL_REQUEST: {
      return {
        ...state
      };
    }
    case REMOVE_LABEL_SUCCESS: {
      return {
        ...state,
        deletedLabelFlg: true
      };
    }
    case REMOVE_LABEL_FAILURE: {
      return {
        ...state,
        labelErrorMessage: '라벨삭제에 실패하였습니다'
      };
    }
    case REMOVE_LABEL_MEMOS_REQUEST: {
      return {
        ...state
      };
    }
    case REMOVE_LABEL_MEMOS_SUCCESS: {
      return {
        ...state,
        updatedLabelFlg: true
      };
    }
    case REMOVE_LABEL_MEMOS_FAILURE: {
      return {
        ...state,
        labelErrorMessage: '라벨지정취소에 실패하였습니다'
      };
    }
    case REMOVE_ALL_LABEL_MEMOS_REQUEST: {
      return {
        ...state
      };
    }
    case REMOVE_ALL_LABEL_MEMOS_SUCCESS: {
      return {
        ...state,
        updatedLabelFlg: true
      };
    }
    case REMOVE_ALL_LABEL_MEMOS_FAILURE: {
      return {
        ...state,
        labelErrorMessage: '라벨일괄지정취소에 실패하였습니다'
      };
    }
    case RESET_LABEL_LIST: {
      return {
        ...state,
        labelList: []
      };
    }
    case RESET_SELECTED_LABEL: {
      return {
        ...state,
        selectedLabel: { _id: 'all'}
      };
    }
    case RESET_LABEL_ERROR_MESSAGE: {
      return {
        ...state,
        labelErrorMessage: ''
      };
    }
    case RESET_CREATED_LABEL_FLG: {
      return {
        ...state,
        createdLabelFlg: false
      };
    }
    case RESET_UPDATED_LABEL_FLG: {
      return {
        ...state,
        updatedLabelFlg: false
      };
    }
    case RESET_DELETED_LABEL_FLG: {
      return {
        ...state,
        deletedLabelFlg: false
      };
    }
    default: {
      return {
        ...state
      };
    }
  }
};

export default reducer;