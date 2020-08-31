import tw from "twin.macro"

const MainModule = tw.div`m-4 p-4 bg-gray-100`;

const CategoryDetails = (props) => {

	const category = props.fields.category.fields

	return (
		<MainModule>
			{category.title}
		</MainModule>
	)
}


export default CategoryDetails