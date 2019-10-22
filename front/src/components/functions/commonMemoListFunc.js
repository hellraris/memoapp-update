
 export const makeSortData = (sortType) => {
  let sortData;
  switch (sortType) {
    case 'writeDateDesc' : {
      sortData = {
        target: 'createdAt',
        type: '-1'
      }
      break
    }
    case 'writeDateAsc' : {
      sortData = {
        target: 'createdAt',
        type: '1'
      }
      break
    }
    case 'updateDateDesc' : {
      sortData = {
        target: 'updatedAt',
        type: '-1'
      }
      break
    }
    case 'updateDateAsc' : {
      sortData = {
        target: 'updatedAt',
        type: '1'
      }
      break
    }
    case 'TitleAsc' : {
      sortData = {
        target: 'title',
        type: '1'
      }
      break
    }
    default : {
      sortData = {
        target: 'createdAt',
        type: '-1'
      }
      break
    }
  }
  return sortData;
};