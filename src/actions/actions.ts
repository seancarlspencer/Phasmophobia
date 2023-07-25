export const increment = () => ({
    type: 'INCREMENT',
  });
  
  export const decrement = () => ({
    type: 'DECREMENT',
  });
  
export const updateToggle = (bool: boolean) => ({
    type: 'toggle',
    payload: bool
  });
  
  export const updateStartDay = (num: Number) => ({
    type: 'updateStartDay',
    payload: num
  });
  
export const updateMonth = (num: Number) => ({
    type: 'updateMonth',
    payload: num
  });

export const updateYear = (num: Number) => ({
    type: 'updateYear',
    payload: num
  });
  
  export const updateDays = (num: Number) => ({
    type: 'updateDays',
    payload: num
  });

  export const updateEvidence = (arr: Array<boolean>) => ({
    type: 'updateEvidence',
    payload: arr
  });

  export const handleToggleStickyAction = () => ({
    type: 'toggleSticky'
  });
  