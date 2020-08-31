import tw from "twin.macro"

const MainModule = tw.div`m-4 p-4 bg-gray-100`;

const LeftSideNav = (props) => {

	const { dynamicPageItem, customData } = props
	let navItems = customData || []

	navItems = navItems.map(n => {

		let href = "#"
		if (n.fields.link && n.fields.link.href) {
			href = n.fields.link.href
		}
		return (
			<div key={"link" + n.contentID}>
				<a href={href}>{n.fields.title}</a>
			</div>
		)
	})

	return (
		<MainModule>
			{navItems}
		</MainModule>
	)
}

LeftSideNav.getCustomInitialProps = async function ({ agility, channelName, languageCode }) {
	const api = agility;

	try {


		//get the nav items posts
		return await api.getContentList({ referenceName: 'leftsidenav', languageCode });


	} catch (error) {
		if (console) console.error(error);
	}
}


export default LeftSideNav