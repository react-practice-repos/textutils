import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

function TextForm(props) {
	const [text, setText] = useState('');
	const [frequency, setFrequency] = useState('');

	const handleConvertToUppercase = () => {
		let updatedText = text.toUpperCase();
		setText(updatedText);
		props.showAlert('Converted to uppercase!', 'success');
	};

	const handleConvertToLowercase = () => {
		let updatedText = text.toLowerCase();
		setText(updatedText);
		props.showAlert('Converted to lowercase!', 'success');
	};

	const handleClearTextArea = () => {
		setText('');
		props.showAlert('TextArea cleared!', 'success');
	};

	const handleOnChange = (event) => {
		setText(event.target.value);
	};

	const handleOnBlur = (event) => {
		setText(event.target.value.trim());
	};

	const copyText = (event) => {
		let enteredText = document.getElementById('textArea_1');
		enteredText.select();
		navigator.clipboard.writeText(enteredText.value);
		document.getSelection().removeAllRanges();
		props.showAlert('Text Copied to Clipboard!', 'success');
	};

	const removeExtraSpaces = (event) => {
		let newText = text.split(/[ ]+/);
		setText(newText.join(' '));
		props.showAlert('Removed Extra Spaces!', 'success');
	};

	const handleFindWordFrequency = () => {
		let result = findWordFrequency();
		setFrequency(JSON.stringify(result, null, 2));
	};

	const findWordFrequency = () => {
		if (text.length === 0) {
			return {};
		} else {
			let strArray = text.split(' ');
			let outputArr = {};
			for (let index = 0; index < strArray.length; index++) {
				let word = strArray[index];
				if (outputArr[word] === undefined) {
					outputArr[word] = 1;
				} else {
					outputArr[word] += 1;
				}
			}
			return outputArr;
		}
	};

	return (
		<>
			<Container>
				<div className={`text-${props.mode === 'dark' ? 'light' : 'black'}`}>
					<div className='mb-3'>
						<label htmlFor='exampleFormControlTextarea1' className='form-label fs-1'>
							{props.name}
						</label>
						<textarea
							className='form-control'
							style={{ backgroundColor: props.mode === 'light' ? '#e5e8e9' : '##9faeaf' }}
							value={text}
							onChange={handleOnChange}
							id='textArea_1'
							rows='8'
							onBlur={handleOnBlur}
						></textarea>
					</div>

					<button className='btn btn-primary' disabled={text.length === 0} onClick={handleConvertToUppercase}>
						Convert to Uppercase
					</button>

					<button className='btn btn-primary mx-2 my-1' disabled={text.length === 0} onClick={handleConvertToLowercase}>
						Convert to Lowercase
					</button>

					<button className='btn btn-primary mx-2 my-1' disabled={text.length === 0} onClick={handleFindWordFrequency}>
						Find Word Frequency
					</button>

					<button className='btn btn-primary mx-2 my-1' disabled={text.length === 0} onClick={removeExtraSpaces}>
						Remove Extra Spaces
					</button>

					<button className='btn btn-primary mx-2 my-1' disabled={text.length === 0} onClick={copyText}>
						Copy Text
					</button>

					<button className='btn btn-primary mx-2 my-1' disabled={text.length === 0} onClick={handleClearTextArea}>
						Clear
					</button>
				</div>
				<div className={`container my-5 text-${props.mode === 'dark' ? 'light' : 'black'}`}>
					<h2>Your Text Summary</h2>
					<p>Total characters in textArea is : {text.length}</p>
					<p>
						Total word count in textArea is :{' '}
						{
							text.split(' ').filter((element) => {
								return element.length !== 0;
							}).length
						}
					</p>
					<p>
						Time required to read all text is :{' '}
						{text.split(' ').filter((element) => {
							return element.length !== 0;
						}).length * 0.008}{' '}
						minutes
					</p>
					<p>Word Frequency : {frequency}</p>
					<h2>Preview</h2>
					<p>{text}</p>
				</div>
			</Container>
		</>
	);
}

export default TextForm;
