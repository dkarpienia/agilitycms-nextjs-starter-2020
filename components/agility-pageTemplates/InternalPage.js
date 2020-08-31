import React, { Component } from 'react';
import ContentZone from 'components/agility-global/ContentZone'
import tw from "twin.macro";

const Grid = tw.div`grid grid-cols-3 gap-4 my-8`;
const LeftCol = tw.div`col-span-1 bg-gray-200 `
const RightCol = tw.div`col-span-2 bg-gray-400`


const InternalPage = (props) => {
	return (
		<Grid>
			<LeftCol>
				<ContentZone name='LeftColumnZone' {...props} />
			</LeftCol>
			<RightCol>
				<ContentZone name='MainContentZone' {...props} />
			</RightCol>
		</Grid>
	)
}

export default InternalPage