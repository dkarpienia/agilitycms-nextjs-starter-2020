import tw from "twin.macro"

const MainModule = tw.div`m-4 p-4 bg-gray-100`;

const CategoryDetails = (props) => {

	const category = props.fields.category.fields
	if (!category) return null
	return (
		<MainModule>
			{category.title}
		</MainModule>
	)

	return null
}


export default CategoryDetails