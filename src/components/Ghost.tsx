import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../actions/actions';
import Evidence from './Evidence';
import phasGhosts from '../assets/phasEvidenceParsed.json';

interface GhostInterface{
  ghostName: string
}

const Ghost: React.FC<GhostInterface> = ({ghostName}) => {
  const evidenceValues = useSelector((state: any) => state.phas.evidenceValues);
  const dispatch = useDispatch();

  return (
    <div className="ghost-container">
      <div className="ghost-name">
        {ghostName}
      </div>
      <div className="ghost-evidence">
        
      </div>
      <div className="ghost-properties">
        
      </div>
      <div className="ghost-secondary">

      </div>
    </div>
  );
};

export default Ghost;
