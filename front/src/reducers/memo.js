export const intialState = {
  memoList: [],
  memoCount: 0,
  selectedMemo: null,
  memoErrorMessage: '',
  createdMemoFlg: false,
  updatedMemoFlg: false,
  deletedMemoFlg: false
};

// 메모리스트 불러오기 액션
export const GET_MEMO_LIST_REQUEST = 'GET_MEMO_LIST_REQUEST';
export const GET_MEMO_LIST_SUCCESS = 'GET_MEMO_LIST_SUCCESS';
export const GET_MEMO_LIST_FAILURE = 'GET_MEMO_LIST_FAILURE';

// 메모카운트 액션
export const GET_MEMO_COUNT_REQUEST = 'GET_MEMO_COUNT_REQUEST';
export const GET_MEMO_COUNT_SUCCESS = 'GET_MEMO_COUNT_SUCCESS';
export const GET_MEMO_COUNT_FAILURE = 'GET_MEMO_COUNT_FAILURE';

// 메모 불러오기 액션
export const GET_MEMO_REQUEST = 'GET_MEMO_REQUEST';
export const GET_MEMO_SUCCESS = 'GET_MEMO_SUCCESS';
export const GET_MEMO_FAILURE = 'GET_MEMO_FAILURE';

// 메모작성 액션
export const CREATE_MEMO_REQUEST = 'CREATE_MEMO_REQUEST';
export const CREATE_MEMO_SUCCESS = 'CREATE_MEMO_SUCCESS';
export const CREATE_MEMO_FAILURE = 'CREATE_MEMO_FAILURE';

// 메모수정 액션
export const UPDATE_MEMO_REQUEST = 'UPDATE_MEMO_REQUEST';
export const UPDATE_MEMO_SUCCESS = 'UPDATE_MEMO_SUCCESS';
export const UPDATE_MEMO_FAILURE = 'UPDATE_MEMO_FAILURE';

// 메모삭제 액션
export const REMOVE_MEMO_REQUEST = 'REMOVE_MEMO_REQUEST';
export const REMOVE_MEMO_SUCCESS = 'REMOVE_MEMO_SUCCESS';
export const REMOVE_MEMO_FAILURE = 'REMOVE_MEMO_FAILURE';

// 메모일괄삭제 액션
export const REMOVE_MEMOS_REQUEST = 'REMOVE_MEMOS_REQUEST';
export const REMOVE_MEMOS_SUCCESS = 'REMOVE_MEMOS_SUCCESS';
export const REMOVE_MEMOS_FAILURE = 'REMOVE_MEMOS_FAILURE';

// 불러오기한 라벨데이터에 포함된 메모목록을 가지고 메모목록 뷰를 업데이트하는 액션
export const UPDATE_MEMO_LIST_BY_LABEL = 'UPDATE_MEMO_LIST_BY_LABEL';

// 각종 초기화 액션
export const RESET_CREATED_MEMO_FLG = 'RESET_CREATED_MEMO_FLG';
export const RESET_UPDATED_MEMO_FLG = 'RESET_UPDATED_MEMO_FLG';
export const RESET_DELETED_MEMO_FLG = 'RESET_DELETED_MEMO_FLG';
export const RESET_SELECTED_MEMO = 'RESET_SELECTED_MEMO';
export const RESET_MEMO_LIST = 'RESET_MEMO_LIST';
export const RESET_MEMO_ERROR_MESSAGE = 'RESET_MEMO_ERROR_MESSAGE';

export const getMemoListAction = {
  type: GET_MEMO_LIST_REQUEST
};

export const getMemoCountAction = {
  type: GET_MEMO_COUNT_REQUEST
};

export const getMemoAction = (id) => {
  return {
    type: GET_MEMO_REQUEST,
    data: id
  }
};

export const createMemoAction = (memo) => {
  return {
    type: CREATE_MEMO_REQUEST,
    data: memo
  }
};

export const updateMemoAction = (memo) => {
  return {
    type: UPDATE_MEMO_REQUEST,
    data: memo
  }
};

export const removeMemoAction = (id) => {
  return {
    type: REMOVE_MEMO_REQUEST,
    data: id
  }
};

export const removeMemosAction = (memoIds) => {
  return {
    type: REMOVE_MEMOS_REQUEST,
    data: memoIds
  }
};

export const updateMemoListByLabel = (memos) => {
  return ({
    type: UPDATE_MEMO_LIST_BY_LABEL,
    data: memos
  });
};

export const resetSelectedMemo = {
  type: RESET_SELECTED_MEMO
};

export const resetMemoErrorMessage = {
  type: RESET_MEMO_ERROR_MESSAGE
};

export const resetMemoList = {
  type: RESET_MEMO_LIST
};

export const resetCreatedMemoFlg = {
  type: RESET_CREATED_MEMO_FLG
};

export const resetUpdatedMemoFlg = {
  type: RESET_UPDATED_MEMO_FLG
};

export const resetDeletedMemoFlg = {
  type: RESET_DELETED_MEMO_FLG
};

const reducer = (state = intialState, action) => {
  switch (action.type) {
    case GET_MEMO_LIST_REQUEST: {
      return {
        ...state
      };
    }
    case GET_MEMO_LIST_SUCCESS: {
      return {
        ...state,
        memoList: action.data,
        memoCount: action.data.length
      };
    }
    case GET_MEMO_LIST_FAILURE: {
      return {
        ...state,
        memoErrorMessage: '메모리스트 불러오기에 실패하였습니다'
      };
    }
    case GET_MEMO_COUNT_REQUEST: {
      return {
        ...state
      };
    }
    case GET_MEMO_COUNT_SUCCESS: {
      return {
        ...state,
        memoCount: action.data
      };
    }
    case GET_MEMO_COUNT_FAILURE: {
      return {
        ...state,
        memoErrorMessage: '메모카운트에 실패하였습니다'
      };
    }
    case GET_MEMO_REQUEST: {
      return {
        ...state
      };
    }
    case GET_MEMO_SUCCESS: {
      return {
        ...state,
        selectedMemo: action.data
      };
    }
    case GET_MEMO_FAILURE: {
      return {
        ...state,
        memoErrorMessage: '메모 불러오기에 실패하였습니다'
      };
    }
    case CREATE_MEMO_REQUEST: {
      return {
        ...state
      };
    }
    case CREATE_MEMO_SUCCESS: {
      return {
        ...state,
        selectedMemo: action.data,
        createdMemoFlg: true
      };
    }
    case CREATE_MEMO_FAILURE: {
      return {
        ...state,
        memoErrorMessage: '메모작성에 실패하였습니다'
      };
    }
    case UPDATE_MEMO_REQUEST: {
      return {
        ...state
      };
    }
    case UPDATE_MEMO_SUCCESS: {
      return {
        ...state,
        selectedMemo: action.data,
        updatedMemoFlg: true
      };
    }
    case UPDATE_MEMO_FAILURE: {
      return {
        ...state,
        memoErrorMessage: '메모수정에 실패하였습니다'
      };
    }
    case REMOVE_MEMO_REQUEST: {
      return {
        ...state
      };
    }
    case REMOVE_MEMO_SUCCESS: {
      return {
        ...state,
        deletedMemoFlg: true
      };
    }
    case REMOVE_MEMO_FAILURE: {
      return {
        ...state,
        memoErrorMessage: '메모삭제에 실패하였습니다'
      };
    }
    case REMOVE_MEMOS_REQUEST: {
      return {
        ...state
      };
    }
    case REMOVE_MEMOS_SUCCESS: {
      return {
        ...state,
        deletedMemoFlg: true
      };
    }
    case REMOVE_MEMOS_FAILURE: {
      return {
        ...state,
        memoErrorMessage: '일괄 메모삭제에 실패하였습니다'
      };
    }
    case UPDATE_MEMO_LIST_BY_LABEL: {
      return {
        ...state,
        memoList: action.data
      };
    }
    case RESET_SELECTED_MEMO: {
      return {
        ...state,
        selectedMemo: {}
      };
    }
    case RESET_MEMO_LIST: {
      return {
        ...state,
        memoList: []
      };
    }
    case RESET_MEMO_ERROR_MESSAGE: {
      return {
        ...state,
        memoErrorMessage: ''
      };
    }
    case RESET_CREATED_MEMO_FLG: {
      return {
        ...state,
        createdMemoFlg: false
      };
    }
    case RESET_UPDATED_MEMO_FLG: {
      return {
        ...state,
        updatedMemoFlg: false
      };
    }
    case RESET_DELETED_MEMO_FLG: {
      return {
        ...state,
        deletedMemoFlg: false
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