export default function Slider({ className = "slider", id = "", children }) {

	return (
		<div className={className} id={id}>
			<i className="fa-solid fa-angle-left"></i>
			<div className="slider-body">
				{children}
			</div>
			<i className="fa-solid fa-angle-right"></i>
		</div >
	)
}