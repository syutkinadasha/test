import React, {useCallback, useEffect, useState} from 'react';
import cn from 'classnames';

function Sort ({ onSort }) {
    const sortList = [
        {
            name: 'По площади',
            fieldName: 'area',
            type: 'asc'
        },{
            name: 'По площади',
            fieldName: 'area',
            type: 'desc'
        },{
            name: 'По цене',
            fieldName: 'price',
            type: 'asc'
        },{
            name: 'По цене',
            fieldName: 'price',
            type: 'desc'
        }
    ];
    const [openSort, setOpenSort] = useState(false);
    const [activeSort, setActiveSort] = useState({});

    useEffect(() => {
        setActiveSort(sortList[0]);
    }, []);

    const onClick = useCallback(() => {
        setOpenSort(s => !s);
    }, []);

    const onClickSort = useCallback((item) => {
        setActiveSort(item);
        setOpenSort(false);
        onSort(item.fieldName, item.type);
    }, []);

    return (
        <div className="sort">
            <div
                className={cn('sort__title', `sort__item_${activeSort.type}`)}
                onClick={onClick}
            >
                <span>{activeSort.name}</span>
            </div>
            <div className={cn('sort__list', {'sort__list_open': openSort})}>
                <div className="sort__close" onClick={onClick}></div>
                {sortList.map((item, key) => {
                    return (
                        <div
                            key={key}
                            className={cn('sort__item', `sort__item_${item.type}`)}
                            onClick={() => onClickSort(item)}
                        >
                            <span>{item.name}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Sort;