import { NavLink } from "react-router-dom";

const routes = [
	{to: "/", name: "Home"},
	{to: "/person-list", name: "Person list"},
	{to: "/address-list", name: "Address list"},
	{to: "/add-person", name: "Add person"},
	{to: "/add-address", name: "Add address"},
]

export function Navbar() {
	return (
		<nav style={{
			display: "flex",
			alignItems: "center",
			gap: "16px",
			position: "sticky",
			top: "0px",
			height: "40px",
			padding: "8px",
			background: "#242424",
		}}>
			{ 
				routes.map((r, i) => {
					return (
						<NavLink key={i} to={r.to} >
							{r.name}
						</NavLink>
					)
				})
			}
		</nav>
	)
}
