import { Col, Container, Image, Row } from "react-bootstrap"
import { useEffect } from "react"
function Weather(props) {
	useEffect(() => {
		console.log("props updated", props)
	})
	return (
		<Container className="text-left m-0">
			<Row>
				<Col className="col-12 mx-2">
					<b className="h3">{props.title}</b>
				</Col>
				<Col className="col-12">
					<Image
						src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`}
						alt={props.weather.weather[props.page].description}
						title={props.weather.weather[props.page].description}
					></Image>
				</Col>
				<div className="col col-12">
					<b>temperature</b>
					<p className="mx-3 my-0">
						<b>min :</b>
						{props.weather.temp.min}℃{" "}
					</p>
					<p className="mx-3 my-0">
						<b>avg :</b>
						{props.weather.temp.day}℃{" "}
					</p>
					<p className="mx-3 my-0">
						<b>max :</b>
						{props.weather.temp.max}℃{" "}
					</p>
				</div>
			</Row>
		</Container>
	)
}

export default Weather
