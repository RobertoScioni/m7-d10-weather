import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { useState, useEffect } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"

import Weather from "./Components/Weather"
/**
 * let weatherBox = await fetch(
						`api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&cnt=7&appid=3d00be1e2a9c3b2d72c968387fe867c6`
					)
					weatherBox = await weatherBox.json()
 */
function App() {
	let [location, setLocation] = useState("")
	let [update, setUpdate] = useState(false)
	let [weather, setWeather] = useState(null)
	useEffect(async () => {
		if (location === "") {
			return
		}
		//let coords = geocoder.geocode(location)
		//console.log("here goes the fetch for ", coords)
		//let URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&format=json&appid=3d00be1e2a9c3b2d72c968387fe867c6`

		//console.log("URL=")
		//console.log(URL)
		try {
			let coords = await fetch(
				`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=3d00be1e2a9c3b2d72c968387fe867c6`
			)
			coords = await coords.json()
			let lat = coords[0].lat
			let lon = coords[0].lon
			console.log(coords[0])
			let URL = `
      https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=3d00be1e2a9c3b2d72c968387fe867c6`
			let response = await fetch(URL)
			response = await response.json()
			setWeather(response)
		} catch (error) {
			console.log(error)
		}

		/*return () => {
			//cleanup
		}*/
	}, [update])
	return (
		<div className="App m-1">
			<Form
				onSubmit={async (e) => {
					e.preventDefault()
					setUpdate(!update)
				}}
				className="mb-3"
			>
				<Form.Control
					type="text"
					placeholder="Location"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
				></Form.Control>
			</Form>
			<Container>
				<Row>
					{weather !== null &&
						weather.daily.map((element, index) => (
							<Col className="col-12 col-sm-6 col-md-3 border-bottom">
								<Weather
									page={0}
									weather={weather.daily[index]}
									title={`Day${index}`}
								/>
							</Col>
						))}
				</Row>
			</Container>
		</div>
	)
}

export default App
