  export const updateEvidence = (arr: Array<boolean>) => ({
    type: 'updateEvidence',
    payload: arr
  });

  export const updatePossible = (arr: Array<boolean>) => ({
    type: 'updatePossible',
    payload: arr
  });

  export const updateEliminated = (arr: Array<boolean>) => ({
    type: 'updateEliminated',
    payload: arr
  });

  export const updateSpeed = (arr: Array<boolean>) => ({
    type: 'updateSpeed',
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
  
  export const handleLightMode = () => ({
    type: 'lightMode'
  });

  export const handleObjectiveBoardScreen = (str: string) => ({
    type: 'objectiveBoardScreen',
    payload: str
  });

  export const updateEvidenceNumber = (num: number) => ({
    type: 'evidenceNumber',
    payload: num
  });
  
  export const updateGuessArray = (arr: Array<boolean>) => ({
    type: 'updateGuessArray',
    payload: arr
  });