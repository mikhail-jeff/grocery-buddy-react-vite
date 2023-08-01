import React, { useState } from 'react';

const GroceryItem = ({ item, handleEditItem, handleDeleteItem }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newItem, setNewItem] = useState(item.name);
	const [errors, setErrors] = useState('');

	const handleChange = (e) => {
		setNewItem(e.target.value);
	};

	//*** EDIT ITEM
	const onEdit = () => {
		if (newItem) {
			handleEditItem(item.id, newItem);
			setIsEditing(false);
			setErrors('');
		} else {
			setErrors('Grocery item cannot be empty.');
		}
	};

	return (
		<>
			<li>
				{isEditing ? (
					<input
						type='text'
						value={newItem}
						onChange={handleChange}
					/>
				) : (
					<span>{item.name}</span>
				)}

				<div>
					<button
						className='btn-edit'
						onClick={() => {
							isEditing ? onEdit() : setIsEditing(true);
						}}>
						{isEditing ? 'Save' : 'Edit'}
					</button>
					<button
						className='btn-delete'
						onClick={() => {
							handleDeleteItem(item.id);
						}}>
						Delete
					</button>
				</div>
			</li>
			{errors ? <p className='errors'>{errors}</p> : null}
		</>
	);
};

export default GroceryItem;
