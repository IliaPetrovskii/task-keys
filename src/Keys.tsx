import { IItem } from './index';
import React, { useState, useRef, useEffect } from 'react';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [items, setItems] = useState<IItem[]>([]);
    const [itemId, setItemId] = useState<number>(-1);
    const [itemValue, setItemValue] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        setItems(props.initialData);
    }, [props.initialData]);
    const saveData = (data: string) => {
        setItems((x) =>
            x.map((item) => {
                if (item.id === itemId) item.name = data;
                return item;
            }),
        );
        setItemValue('');
        setItemId(-1);
    };
    const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const target = e.target as HTMLLIElement;
        const targetId = Number(target.dataset['id']);
        const value = String(target.dataset['value']);
        setItemValue(value);
        setItemId(targetId);
    };
    const handleInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'Enter':
                saveData(String(inputRef.current?.value));
                break;
            case 'Escape':
                saveData(itemValue);
                break;
        }
    };
    const sort = (firstItem: IItem, secondItem: IItem) => {
        switch (props.sorting) {
            case 'ASC':
                return firstItem.id - secondItem.id;
            case 'DESC':
                return secondItem.id - firstItem.id;
            default:
                return 0;
        }
    };
    return (
        <div>
            <ul>
                {items.sort(sort).map(({ id, name }) =>
                    itemId === id ? (
                        <input
                            ref={inputRef}
                            autoFocus
                            defaultValue={name}
                            onKeyDown={handleInput}
                            key={id}
                        />
                    ) : (
                        <li
                            key={id}
                            data-id={id}
                            data-value={name}
                            onClick={onClick}
                        >
                            {name}
                        </li>
                    ),
                )}
            </ul>
        </div>
    );
}
