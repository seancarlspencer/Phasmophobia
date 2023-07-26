export const increment = () => ({
    type: 'INCREMENT',
  });
  
  export const decrement = () => ({
    type: 'DECREMENT',
  });

  export const updateEvidence = (arr: Array<boolean>) => ({
    type: 'updateEvidence',
    payload: arr
  });

  export const updatePossible = (arr: Array<boolean>) => ({
    type: 'updatePossible',
    payload: arr
  });

  export const updateGuess = (arr: Array<string>) => ({
    type: 'updateGuess',
    payload: arr
  });

  export const handleToggleStickyAction = () => ({
    type: 'toggleSticky'
  });
  
  export const handleToggleExpert = () => ({
    type: 'toggleExpert'
  });
  