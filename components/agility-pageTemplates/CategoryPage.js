import React, { Component } from 'react';
import ContentZone from 'components/agility-global/ContentZone'


const CategoryPage = (props) => {
	return (
		<div className="category-template">

			<ContentZone name='Category' {...props} />

		</div>
	)
}

export default CategoryPage