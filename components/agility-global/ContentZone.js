import React, { Component } from 'react';
import dynamic from 'next/dynamic'


export default function ContentZone({ name, page, dynamicPageItem }) {
	function RenderModules() {

		let modules = page.zones[name];

		const modulesToRender = modules.map(m => {
			try {
				let AgilityModule = dynamic(() => import('components/agility-modules/' + m.moduleName + '.js'))

				if (m.item) {
					return <AgilityModule key={m.item.contentID} page={page} dynamicPageItem={dynamicPageItem} {...m.item} />
				} else {
					return null
				}
			} catch (err) {
				return <div>{` Error rendering module ${m.moduleName} - ${err}`}</div>
			}
		})

		return modulesToRender;
	}


	return (
		<div>
			<RenderModules />
		</div>
	)
}
