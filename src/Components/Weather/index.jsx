import { Col, Container, Image, Row } from "react-bootstrap"
import { useEffect } from "react"
import moment from "moment"

function Weather(props) {
	useEffect(() => {
		//console.log("props updated", props)
	})
	let day = moment(props.weather.dt)
	console.log(
		"day in unix",
		props.weather.dt,
		"day according to moment",
		day.format("dddd, MMMM Do YYYY, h:mm:ss a")
	)
	return (
		//<Container className="text-left m-0">
		//	<Row>
		<>
			<Col className="col-12 mx-2">
				<b className="h3">{day.format("dddd")}</b>
			</Col>
			<Col className="col-12">
				<Image
					src={`http://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`}
					alt={props.weather.weather[0].description}
					title={props.weather.weather[0].description}
				></Image>
			</Col>
			<div className="col col-12 text-left">
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
		</>
		//	</Row>
		//</Container>
	)
}

export default Weather
