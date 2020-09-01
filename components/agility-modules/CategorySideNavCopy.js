import { useRouter } from 'next/router'
import tw from "twin.macro"

const MainModule = tw.div`m-4 p-4 bg-gray-100`;

const CategorySideNav = (props) => {
	const router = useRouter()

	const { dynamicPageItem, customData } = props
	let navItems = customData || []

	const navClick = (e) => {
		e.preventDefault()
		// e.stopPropagation();
		// e.nativeEvent.stopImmediatePropagation();

		const catID = e.target.getAttribute("data-content-id")
		router.push(`?category=${catID}`, `/sample-dashboard-application?category=${catID}`, { shallow: true })

		return false
	}

	navItems = navItems.map(n => {
		//todo: make this more dynamic
		let href = `/sample-dashboard-application?category=${n.contentID}`

		return (
			<div key={"link" + n.contentID}>
				<a href={href} data-content-id={n.contentID} onClick={navClick}>{n.fields.title}</a>
			</div>
		)
	})

	return (
		<MainModule>
			{navItems}
		</MainModule>
	)
}

CategorySideNav.getCustomInitialProps = async function (props) {

	const { item, agility, channelName, languageCode } = props
	const api = agility;

	try {

		let refName = "categories"
		if (item.fields.categories && item.fields.categories.referencename) {
			refName = item.fields.categories.referencename
		}

		//get the categories
		return await api.getContentList({ referenceName: refName, languageCode });


	} catch (error) {
		if (console) console.error(error);
	}
}


export default CategorySideNav