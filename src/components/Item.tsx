import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateGuessArray } from '../actions/actions';

interface ItemInterface{
  itemName: string
  level: Array<number>
  consumable: Array<boolean>
  descriptor: string
  descriptorValues: Array<string>
  range: Array<number>
  price: number
  electronic: Array<boolean>
  uses: Array<number>
  descriptions: Array<string>
}

const Item: React.FC<ItemInterface> = ({
  itemName,
  level,
  consumable,
  descriptor,
  descriptorValues,
  range,
  price,
  electronic,
  uses,
  descriptions}) => {
  const dispatch = useDispatch();

  return (
    <div className="tiers-item-container tiers-row">
      <div className="tiers-item main">
        <div className="item-name">
          {itemName}
        </div>
        <div className="item-price">
          ${price}
        </div>
      </div>
      {[0,1,2].map((tier)=>{
        return <div className="tiers-item" data-consumable={`${consumable[tier] ? "true" : "false"}`} data-electronic={`${electronic[tier] ? "true" : "false"}`}>
          <div className="level" style={{
            background: `hsla(${(1 - level[tier]/100) * 100},100%,50%,.6)`
          }}>Lv. {level[tier]}</div>
          {descriptions[tier] != "" ?
          <div className="description">{descriptions[tier]}</div>:<div className="description-filler"></div>}
          <div className="item-stats">
          {descriptor!="" ?
            <div className="descriptor">{descriptor}: {descriptorValues[tier]}</div> : null}
            {range.length>=1 ?
            <div className="range">Range(m): {range[tier]}</div> : null}
            {uses[tier]>1 ?
            <div className="uses">Uses: {uses[tier]}</div> : null}
          </div>
      </div>
      })}
  </div>
  );
};

export default Item;
