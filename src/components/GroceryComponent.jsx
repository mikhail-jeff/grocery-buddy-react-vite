import React, { useRef, useState } from 'react';
import { v4 as uuid } from 'uuid';
import GroceryItem from './GroceryItem';

const GroceryComponent = () => {
	const [item, setItem] = useState('');
	const [groceryList, setGroceryList] = useState([]);
	const [errors, setErrors] = useState('');

	const inputRef = useRef();

	const handleChange = (e) => {
		setItem(e.target.value);
	};

	//*** ADD ITEM
	const handleAddItem = () => {
		if (item) {
			setGroceryList([...groceryList, { id: uuid(), name: item }]);
			setItem('');
			setErrors('');
		} else {
			setErrors('Grocery item cannot be empty.');
			inputRef.current.focus();
		}
	};

	//*** EDIT ITEM
	const handleEditItem = (id, newItem) => {
		const updatedGroceryList = groceryList.map((item) => {
			if (item.id === id) {
				return { ...item, name: newItem };
			}
			return item;
		});

		setGroceryList(updatedGroceryList);
	};

	//*** DELETE ITEM
	const handleDeleteItem = (removeId) => {
		const filteredItems = groceryList.filter((item) => item.id !== removeId);
		setGroceryList(filteredItems);
	};

	const handleClearList = () => {
		setGroceryList([]);
	};

	return (
		<div className='grocery-buddy'>
			<h1>Grocery Buddy</h1>
			<div className='input-section'>
				<div className='input-container'>
					<input
						ref={inputRef}
						type='text'
						placeholder='Enter an item...'
						value={item}
						onChange={handleChange}
					/>
					<button
						className='btn-add'
						onClick={handleAddItem}>
						Add Item
					</button>
				</div>
				<div>{errors ? <p className='errors'>{errors}</p> : null}</div>
			</div>
			<ul className='grocery-list'>
				{groceryList.map((item) => (
					<GroceryItem
						key={item.id}
						item={item}
						handleEditItem={handleEditItem}
						handleDeleteItem={handleDeleteItem}
					/>
				))}
			</ul>
			{groceryList.length > 0 ? (
				<button
					onClick={handleClearList}
					className='btn-clear'>
					Clear List
				</button>
			) : null}
		</div>
	);
};

export default GroceryComponent;
