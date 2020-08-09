import React from 'react';
import card1 from '../../images/card1.png';
import card2 from '../../images/card2.png';
import card3 from '../../images/card3.png';
import card4 from '../../images/card4.png';
import card5 from '../../images/card5.png';
import card6 from '../../images/card6.png';

function Card ({ id, name, sizeW, sizeD, sizeH, area, additional, price, additionalFull }) {

    const images = [card1, card2, card3, card4, card5, card6];

    return (
        <div className="cards__item">
            <div className="cards__image">
                <img src={images[id-1]} />
            </div>
            <div className="cards__title">{name}</div>
            <ul className="cards__description">
                <li>
                    {
                        sizeW && sizeD && sizeH ? (
                            <>
                                <span>Размеры (ШхГхВ)</span> - <span>{sizeW}х{sizeD}х{sizeH} см</span>
                            </>
                        ) : ''
                    }
                </li>
                <li>
                    <span>Площадь</span> - <span>{area} м2</span>
                </li>
                <li>
                    <span className="cards__additional">Оснащение номера</span>
                    {
                        additional.length > 0 && additional.map(id => {
                            const el = additionalFull.find(i => i.id === id);
                            if(!el)
                                return (
                                    <i className="cards__icon icon-service_empty" title="Пустой номер"></i>
                                );

                            return (
                                <i className={`cards__icon icon-service_${el.id}`} title={el.name}></i>
                            )
                        })
                    }
                </li>
                <li>
                    <span>Цена за сутки:</span> <span className="cards__price">{price}₽</span>
                </li>
            </ul>
            <div className="cards__button">
                <a href="#">Забронировать</a>
            </div>
        </div>
    )
}

export default Card;