import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './components/About';
import Alert from './components/Alert';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';

function App() {
	const [mode, setMode] = useState('light');
	const [alert, setAlert] = useState(null);

	const showAlert = (message, type) => {
		setAlert({
			message: message,
			type: type,
		});
		setTimeout(() => {
			setAlert(null);
		}, 2000);
	};

	const toggleMode = () => {
		if (mode === 'light') {
			setMode('dark');
			document.body.style.backgroundColor = '#0d4e64';
			showAlert('Dark mode has been enabled', 'success');
		} else {
			setMode('light');
			document.body.style.backgroundColor = 'white';
			showAlert('Light mode has been enabled', 'success');
		}
	};

	return (
		<>
			<Navbar appTitle='TextUtils' aboutApp='About TextUtils' mode={mode} toggleMode={toggleMode}></Navbar>
			<Alert alert={alert}></Alert>
			{/*	<Container>
				<TextForm name='Enter text to perform selected operations:' mode={mode} showAlert={showAlert}></TextForm>
			</Container> */}
			<Routes>
				<Route path='/' element={<TextForm name='Enter text to perform selected operations:' mode={mode} showAlert={showAlert}></TextForm>}></Route>
				<Route path='/about' element={<About mode={mode} />}></Route>
			</Routes>
		</>
	);
}
export default App;
