export default function Button({ label, type, clickHandler, icon, iconPos, buttonStyle }) {

	return (
		<button type={type ? type : "button"} className={`button-${buttonStyle + (icon ? ` button-icon-${iconPos}` : "")}`} onClick={clickHandler}>
			{icon && iconPos === "left" ? icon : ""}
			{label}
			{icon && iconPos === "right" ? icon : ""}
		</button>
	)
}