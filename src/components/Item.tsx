import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
  priceToUnlock: Array<number>
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
  descriptions,
  priceToUnlock}) => {
  const mobileView = useSelector((state: any) => state.phas.mobileView);

  let hsaVals=[(1 - level[0]/90) * 180,(1 - level[1]/90) * 180,(1 - level[2]/90) * 180];
  let hsaValsNormal=[(1 - level[0]/90) * 180,(1 - level[1]/90) * 180,(1 - level[2]/90) * 180];

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
        return <div className="tiers-item">
          {mobileView ?
            <div className="level-mobile" style={{
              background: `hsla(${hsaValsNormal[tier]},100%,50%,.6)`,
            }}>Lv. {level[tier]}</div>
            : null}
          <div className="tiers-item-top-container">
            <div className="price-extra-container">
              <div className="price-to-upgrade">
                {priceToUnlock[tier] == 0 ? "Free" : `Unlock: $${priceToUnlock[tier].toLocaleString()}`}
              </div>
              {consumable[tier] || electronic[tier] ?
              <div className="consumable-electronic">
                {consumable[tier] ? <div data-consumable={`${consumable[tier] ? "true" : "false"}`}>Consumable</div>:null}
                {electronic[tier] ? <div data-electronic={`${electronic[tier] ? "true" : "false"}`}>Electronic</div>:null}
              </div>
              :
              null}
            </div>
            {!mobileView ?
            <div className="level-container">
              <div className="level-container-above">
                Lv.<br/><span>{level[tier]}</span>
              </div>
              <div className="level-container-behind"  style={{
                background: `conic-gradient(from 0deg, hsla(${hsaVals[tier]},100%,50%,1) 0%, hsla(${hsaVals[tier]},100%,50%,1) ${(level[tier]/90) * 100}%, hsla(${hsaVals[tier]},100%,50%,0) ${(level[tier]/90) * 100}%)`
              }}>
              </div>
            </div>
            :
            null}
          </div>
          {descriptions[tier] != "" ?
          <div className="description">{descriptions[tier]}</div>:null}
          <div className={`item-stats${descriptions[tier] == "" ? "" : ""}`}>
          {descriptor!="" ?
            <div className="descriptor">{descriptor}: {descriptorValues[tier]}</div> : null}
            {range.length>=1 ?
            <div className="range">Range(m): {range[tier]}</div> : null}
            {uses[tier]>=1 ?
            <div className="uses">Uses: {uses[tier]}</div> : null}
          </div>
      </div>
      })}
  </div>
  );
};

export default Item;
