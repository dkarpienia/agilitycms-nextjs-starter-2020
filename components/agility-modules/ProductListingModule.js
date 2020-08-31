import tw from "twin.macro"

const MainModule = tw.div`m-4 p-4 bg-gray-100`;

const ProductListingModule = (props) => {

	const { dynamicPageItem, customData } = props

	const products = customData.map(n => {

		return (
			<div key={"product" + n.contentID}>
				<a href={n.url}>{n.productName}</a>
			</div>
		)
	})

	console.log("Prod Listing", props)

	return (
		<MainModule>
			{products}
		</MainModule>
	)
}

const resolvePostUrls = function (sitemap, posts) {
	let dynamicUrls = {};
	posts.forEach(post => {

		Object.keys(sitemap).forEach(path => {
			if (sitemap[path].contentID === post.contentID) {
				dynamicUrls[post.contentID] = path;
			}
		})

	})
	return dynamicUrls;
}

ProductListingModule.getCustomInitialProps = async function ({ agility, channelName, languageCode }) {
	const api = agility;

	try {

		let sitemap = await api.getSitemap({ channelName: channelName, languageCode });

		//get the nav items posts
		const list = await api.getContentList({ referenceName: 'products', languageCode });

		const dynamicUrls = resolvePostUrls(sitemap, list)



		return list.map(p => {


			return {
				contentID: p.contentID,
				productName: p.fields.productName,
				url: dynamicUrls[p.contentID]
			}
		});


	} catch (error) {
		if (console) console.error(error);
	}
}


export default ProductListingModule