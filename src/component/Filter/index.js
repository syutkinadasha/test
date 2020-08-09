import React, {useCallback, useState} from 'react';

function Filter ({ cards, additional, onFilter }) {
    const [filter, setFilter] = useState([]);

    const onReset = useCallback(() => {
        setFilter([]);
        onFilter([]);
    }, []);

    const onChangeCheckbox = useCallback((fieldName, value) => {
        let addFilter = [...filter];

        if(addFilter.length === 0 || addFilter.findIndex(item => item.type === fieldName) === -1){
            addFilter.push({
                type: fieldName,
                values: [value]
            })
        } else {
            const pos = addFilter.findIndex(item => item.type === fieldName);

            if(addFilter[pos].values.includes(value)){
                if(addFilter[pos].values.length === 1){
                    addFilter.splice(pos, 1);
                } else {
                    addFilter[pos].values.splice(addFilter[pos].values.indexOf(value), 1)
                }
            } else {
                addFilter[pos].values = [...addFilter[pos].values, value]
            }
        }

        setFilter(addFilter);
    }, [filter]);

    const onChangeInput = useCallback((type, e) => {
        let addFilter = [...filter];

        if(addFilter.length === 0 || addFilter.findIndex(item => item.type === 'price') === -1){
            addFilter.push({
                type: 'price',
                values: (type === 'min' ? {[type]: e.target.value, max: null} : {[type]: e.target.value, min: null})
            })
        } else {
            const pos = addFilter.findIndex(item => item.type === 'price');

            if(e.target.value === '') {
                if(type === 'max'){
                    if(addFilter[pos].values.min === null) {
                        addFilter.splice(pos, 1);
                    } else {
                        addFilter[pos].values[type] = null;
                    }
                }
                if(type === 'min'){
                    if(addFilter[pos].values.max === null) {
                        addFilter.splice(pos, 1);
                    } else {
                        addFilter[pos].values[type] = null;
                    }
                }
            } else {
                addFilter[pos].values[type] = e.target.value;
            }
        }

        setFilter(addFilter);
    }, [filter]);

    return (
        <div className="filter">
            <div className="filter__list">
                <div className="filter__item">
                    <div className="filter__item-title">Цена за сутки, ₽</div>
                    <div className="filter__item-content">
                        <div className="form__field-input">
                            <label className="filter__price_from">от</label>
                            <input type="text"
                                   className="input_type_text"
                                   onChange={(e) => onChangeInput('min', e)}
                                   value={filter.find(item => item.type === 'price')?.values.min || ''}
                            />
                        </div>
                        <div className="form__field-input">
                            <label className="filter__price_to">до</label>
                            <input type="text"
                                   className="input_type_text"
                                   onChange={(e) => onChangeInput('max', e)}
                                   value={filter.find(item => item.type === 'price')?.values.max || ''}
                            />
                        </div>
                    </div>
                </div>
                <div className="filter__item">
                    <div className="filter__item-title">Площадь</div>
                    <div className="filter__item-content">
                        {
                            cards.map(item => {
                                return (
                                    <div className="form__field-checkbox" key={item.id}>
                                        <input type="checkbox"
                                               className="input_type_checkbox"
                                               id={`cha_${item.id}`}
                                               onChange={() => onChangeCheckbox('area', item.area)}
                                               checked={filter.find(item => item.type === 'area')?.values.includes(item.area) === true}
                                        />
                                        <span></span><label htmlFor={`cha_${item.id}`}>{item.area} м2</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="filter__item">
                    <div className="filter__item-title">Оснащение номера</div>
                    <div className="filter__item-content">
                        <div className="form__field-checkbox" key={99}>
                            <input type="checkbox"
                                   className="input_type_checkbox"
                                   id="chad_99"
                                   onChange={() => onChangeCheckbox('additional', null)}
                                   checked={filter.find(item => item.type === 'additional')?.values.includes(null) === true}
                            />
                            <span></span><label htmlFor="chad_99">Пустой номер</label>
                        </div>
                        {
                            additional.map(item => {
                                return (
                                    <div className="form__field-checkbox" key={item.id}>
                                        <input type="checkbox"
                                               className="input_type_checkbox"
                                               id={`chad_${item.id}`}
                                               onChange={() => onChangeCheckbox('additional', item.id)}
                                               checked={filter.find(item => item.type === 'additional')?.values.includes(item.id) === true}
                                        />
                                        <span></span><label htmlFor={`chad_${item.id}`}>{item.name}</label>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="filter__buttons">
                <button type="button" onClick={() => onFilter(filter)} className="filter__button-submit">Применить</button>
                { filter.length > 0 ? (
                    <button type="button" onClick={onReset} className="filter__button-reset">Сбросить фильтр</button>
                ) : ''}
            </div>
        </div>
    )
}

export default Filter;