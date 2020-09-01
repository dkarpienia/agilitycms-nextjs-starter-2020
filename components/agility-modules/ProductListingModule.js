import tw from "twin.macro"
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const MainModule = tw.div`m-4 p-4 bg-gray-100`;

const ProductListingModule = (props) => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(true)
	const { dynamicPageItem, customData, fields } = props
	const [list, setList] = useState([])
	let products = customData || [];


	useEffect(() => {
		// The counter changed!

		let catID = parseInt(router.query.category)
		if (isNaN(catID) || catID < 1) {
			if (fields.category && fields.category.contentID) {
				catID = fields.category.contentID
			}
		}

		let ary = products

		if (catID > 0) {
			ary = ary.filter(n => {
				const foundCat = n.catIDs.filter(c => c == catID)
				return foundCat.length > 0
			})
		}

		setList(ary)
		setIsLoading(false)

	}, [router.query.category])



	return (
		<MainModule>
			{isLoading &&
				<div>Loading...</div>
			}

			{!isLoading && list.length <= 0 &&
				<div>No products found in that category.</div>
			}

			{!isLoading && list.length > 0 &&
				list.map(n => {

					return (
						<div key={"product" + n.contentID}>
							<a href={n.url}>{n.productName}</a>
						</div>
					)
				})
			}
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

		if (!list) return []

		const dynamicUrls = resolvePostUrls(sitemap, list)



		return list
			.sort((a, b) => a.properties.itemOrder - b.properties.itemOrder)
			.map(p => {

				let url = "#"
				if (dynamicUrls[p.contentID]) {
					url = dynamicUrls[p.contentID]
				}

				let catIDs = []
				if (p.fields.productCategories_ValueField) {
					catIDs = p.fields.productCategories_ValueField.split(",").map(c => parseInt(c))
				}



				return {
					contentID: p.contentID,
					productName: p.fields.productName,
					catIDs,
					url
				}
			});


	} catch (error) {
		if (console) console.error(error);
	}
}


export default ProductListingModule