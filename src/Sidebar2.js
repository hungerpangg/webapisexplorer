import { useEffect, useState } from "react";
import axios from "axios";
import { GoChevronDown, GoChevronUp } from "react-icons/go";

function Sidebar() {
	const [nameList, setNameList] = useState([]);
	const [apiList, setApiList] = useState([]);
	const [expandedIndex, setExpandedIndex] = useState(-1);

	const handleClick = (index) => {
		if (index === expandedIndex) setExpandedIndex(-1);
		else setExpandedIndex(index);
	};

	useEffect(async () => {
		const result = await axios.get("https://api.apis.guru/v2/providers.json");
		const { data } = result.data;
		setNameList(data);
	}, []);

	useEffect(() => {
		async function getApis() {
			const result = await Promise.all(
				nameList.map(async (name) => {
					const api = await axios.get(`https://api.apis.guru/v2/${name}.json`);
					return api;
				})
			);
			return result;
		}
		// console.log(result);
		getApis().then((res) => {
			setApiList(res);
		});
	}, [nameList]);

	console.log(apiList, "apiList");
	return (
		<div className="sidebar">
			<h3>Select Provider</h3>
			<ul>
				{nameList.map((name, index) => {
					const isExpanded = index === expandedIndex;
					var data;
					if (isExpanded) {
						axios.get(`https://api.apis.guru/v2/${name}.json`).then((res) => {
							const { apis } = res.data;
							const {
								title,
								"x-logo": { url },
							} = Object.values(apis)[0].info;
							data = { title, url };
							console.log(data);
						});
						// console.log(data);
					}
					// const content = isExpanded && (
					// 	<div>
					// 		<span>{data.url}</span>
					// 		{data.title}
					// 	</div>

					return (
						<li key={index}>
							<div
								className="list-item"
								onClick={() => {
									handleClick(index);
								}}
							>
								<p>{name}</p>
								{isExpanded ? <GoChevronUp /> : <GoChevronDown />}
							</div>
							{/* <div>{content}</div> */}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default Sidebar;
