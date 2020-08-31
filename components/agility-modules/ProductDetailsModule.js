
import tw from "twin.macro"

const MainModule = tw.div`m-4 p-4 bg-gray-100`;

import { Container, ContentWithPaddingXl } from "components/misc/Layouts";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
const HeadingRow = tw.div`flex`;
const Heading = tw(SectionHeading)`text-gray-900 mb-5`;
const DateField = tw.div``;
const Author = tw.div`font-bold text-lg sm:text-xl lg:text-2xl text-secondary-500 tracking-wide`;
const Category = tw.div`font-medium text-primary-700`;
const About = tw.div`font-bold text-lg sm:text-xl lg:text-2xl text-secondary-500 tracking-wide`
const Tag = tw.div`text-gray-700`

const ImageRow = tw.div`my-2`
const Image = tw.img`rounded`

import { RichText } from "./RichTextArea"

import { renderHTML } from "agility/utils"

const ProductDetailsModule = ({ dynamicPageItem, customData }) => {
	const product = dynamicPageItem.fields

	console.log("Product", product)

	return (
		<MainModule>

			<HeadingRow>
				<Heading>{product.productName}</Heading>
			</HeadingRow>
			<About>
				{/* <Category>{customData.category}</Category> */}

				{/* <Author>{customData.authorName}</Author>
				<DateField>{customData.dateStr}</DateField> */}
				<Tag>{product.shortDescription}</Tag>
			</About>
			{/* {customData.imageUrl &&
				<ImageRow>
					<Image src={customData.imageUrl} alt={post.image.label} />
				</ImageRow>
			} */}

			<RichText dangerouslySetInnerHTML={renderHTML(product.planDetails)}></RichText>

		</MainModule>
	)
}

export default ProductDetailsModule