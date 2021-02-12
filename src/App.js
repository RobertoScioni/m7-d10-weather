import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { useState, useEffect } from "react"
import { Col, Container, Form, Row } from "react-bootstrap"

import Weather from "./Components/Weather"
function App() {
	let [location, setLocation] = useState("")
	let [update, setUpdate] = useState(false)
	let [weather, setWeather] = useState(null)
	useEffect(async () => {
		if (location === "") {
			return
		}
		try {
			let coords = await fetch(
				`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.REACT_APP_KEY}`
			)
			coords = await coords.json()
			let lat = coords[0].lat
			let lon = coords[0].lon
			console.log(coords[0])
			let URL = `
      https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${process.env.REACT_APP_KEY}`
			let response = await fetch(URL)
			response = await response.json()
			setWeather(response)
		} catch (error) {
			console.log(error)
		}
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
