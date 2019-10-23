export const CREATED_DATE_DESC = 'CREATED_DATE_DESC';
export const CREATED_DATE_ASC = 'CREATED_DATE_ASC';
export const UPDATED_DATE_DESC = 'UPDATED_DATE_DESC';
export const UPDATED_DATE_ASC = 'UPDATED_DATE_ASC';
export const TITLE_ASC = 'TITLE_ASC';

export const makeSortData = (sortType) => {
let sortData;
switch (sortType) {
  case CREATED_DATE_DESC : {
    sortData = {
      target: 'createdAt',
      type: '-1'
    }
    break
  }
  case CREATED_DATE_ASC : {
    sortData = {
      target: 'createdAt',
      type: '1'
    }
    break
  }
  case UPDATED_DATE_DESC : {
    sortData = {
      target: 'updatedAt',
      type: '-1'
    }
    break
  }
  case UPDATED_DATE_ASC : {
    sortData = {
      target: 'updatedAt',
      type: '1'
    }
    break
  }
  case CREATED_DATE_DESC : {
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