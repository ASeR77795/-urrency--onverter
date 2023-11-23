import React, { useEffect, useRef, useState } from 'react';
import Block from './Block/Block';

const App = () => {
	const [fromCurrency, setFromCurrency] = useState('UAH');
	const [toCurrency, setToCurrency] = useState('USD');
	const [fromPrice, setFromPrice] = useState(0);
	const [toPrice, setToPrice] = useState(1);

	const ratesRef = useRef({});
	useEffect(() => {
		fetch('https://www.cbr-xml-daily.ru/latest.js')
			.then(res => res.json())
			.then(json => {
				ratesRef.current = json.rates;
				onChangeToPrice(1);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const onChangeFromPrise = value => {
		const result =
			(ratesRef.current[toCurrency] / ratesRef.current[fromCurrency]) * value;
		setToPrice(result);
		setFromPrice(value);
	};
	const onChangeToPrice = value => {
		const result =
			(ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
		setFromPrice(result);
		setToPrice(value);
	};
	useEffect(() => {
		onChangeFromPrise(fromPrice);
	}, [fromCurrency]);
	useEffect(() => {
		onChangeToPrice(toPrice);
	}, [toCurrency]);
	const onChangeFromCurrency = cur => {
		setFromCurrency(cur);
		onChangeFromPrise(fromPrice);
	};
	const onChangeToCurrency = cur => {
		setToCurrency(cur);
		onChangeToPrice(toPrice);
	};

	useEffect(() => {}, []);
	return (
		<div className='App'>
			<Block
				value={fromPrice}
				currency={fromCurrency}
				onChangeCurrency={onChangeFromCurrency}
				onChangeValue={onChangeFromPrise}
			/>
			<Block
				value={toPrice}
				currency={toCurrency}
				onChangeCurrency={onChangeToCurrency}
				onChangeValue={onChangeToPrice}
			/>
		</div>
	);
};

export default App;
