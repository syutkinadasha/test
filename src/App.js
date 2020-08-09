import React, {useCallback, useState} from 'react';
import Header from "./component/Header";
import Title from "./component/Title";
import Filter from "./component/Filter";
import Card from "./component/Card";
import Sort from "./component/Sort";

function App() {

    const additional = [
        {
            id: 1,
            name: 'Лежак'
        },{
            id: 2,
            name: 'Когтеточка'
        },{
            id: 3,
            name: 'Игровой-комплекс'
        },{
            id: 4,
            name: 'Домик'
        }
    ];
    const cards = [
        {
            id: 1,
            name: 'Эконом',
            sizeW: null,
            sizeD: null,
            sizeH: null,
            area: 0.63,
            additional: [null],
            price: 100
        },{
            id: 2,
            name: 'Эконом плюс',
            sizeW: 90,
            sizeD: 100,
            sizeH: 180,
            area: 0.90,
            additional: [additional[0].id, additional[1].id],
            price: 200
        },{
            id: 3,
            name: 'Комфорт',
            sizeW: 100,
            sizeD: 125,
            sizeH: 180,
            area: 1.13,
            additional: [additional[0].id, additional[1].id, additional[2].id],
            price: 250
        },{
            id: 4,
            name: 'Сьют',
            sizeW: 125,
            sizeD: 125,
            sizeH: 180,
            area: 1.56,
            additional: [additional[0].id, additional[1].id, additional[2].id],
            price: 350
        },{
            id: 5,
            name: 'Люкс',
            sizeW: 160,
            sizeD: 160,
            sizeH: 180,
            area: 2.56,
            additional: additional.map(i => i.id),
            price: 500
        },{
            id: 6,
            name: 'Супер-Люкс',
            sizeW: 180,
            sizeD: 160,
            sizeH: 180,
            area: 2.88,
            additional: additional.map(i => i.id),
            price: 600
        }
    ];

    const [cardsList, setCardsList] = useState(cards);

    const onSort = useCallback((field, type) => {
        const newCards = [...cards];

        newCards.sort((prev, next) => {
            if (prev[field] === next[field]) return 0;

            if(type === 'asc') {
                if (prev[field] > next[field]) return 1;
                if (prev[field] < next[field]) return -1;
            }

            if(type === 'desc'){
                if (prev[field] > next[field]) return -1;
                if (prev[field] < next[field]) return 1;
            }
        });

        setCardsList(newCards);
    }, [cards]);

    const onFilter = useCallback((filter) => {
        if(filter.length === 0)
            setCardsList(cards);
        else {
            const newCards = cards.filter(card => {
                // фильтруем по каждому товару, если удовлетвоярет всем условиям, то добавляем в выборку
                const res = filter.reduce((result, item) => {
                    if(result.length === 0)
                        return [];

                    if(typeof result[item.type] === 'object'){
                        const join = item.values.filter(i => card[item.type].includes(i));
                        if(join.length === item.values.length)
                            return result;
                        else
                            return [];
                    }

                    if(typeof card[item.type] === 'number'){
                        if(item.type === 'price'){
                            if(item.values.min !== null && item.values.max !== null){
                                if(card.price >= item.values.min && card.price <= item.values.max)
                                    return result;
                                else
                                    return [];
                            } else {
                                if(item.values.min === null) {
                                    if(card.price <= item.values.max)
                                        return result;
                                    else
                                        return [];
                                }
                                if(item.values.max === null) {
                                    if(card.price >= item.values.min)
                                        return result;
                                    else
                                        return [];
                                }
                            }
                        } else {
                            if(item.values.includes(card[item.type]))
                                return result;
                            else
                                return [];
                        }
                    }

                    return result;
                }, card);

                return !!res.id;
            });

            setCardsList(newCards);
        }
    }, [cards]);

    return (
        <div className="page">
            <Header />
            <div className="page-inner">
                <div className="page-header">
                    <Title />
                    <Sort onSort={onSort}/>
                </div>
                <div className="page-sidebar">
                    <Filter cards={cards} additional={additional} onFilter={onFilter} />
                </div>
                <div className="page-content">
                    <div className="cards">
                        {
                            cardsList.map( card => {
                                return (
                                    <Card
                                        key={card.id}
                                        additionalFull={additional}
                                        {...card}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
