import React, { useEffect, useState } from 'react';
import Block from './Block/Block';

const App = () => {
	const [fromCurrency, setFromCurrency] = useState('UAH');
	const [toCurrency, setToCurrency] = useState('USD');
	const [fromPrice, setFromPrice] = useState(0);
	const [toPrice, setToPrice] = useState(0);

	const [rates, setRates] = useState({});

	useEffect(() => {
		fetch('https://www.cbr-xml-daily.ru/latest.js')
			.then(res => res.json())
			.then(json => {
				setRates(json.rates);
				console.log(json.rates);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const onChangeFromPrise = value => {
		const price = value / rates[fromCurrency];
		const result = price * rates[toCurrency];
		setFromPrice(value);
		setToPrice(result);
	};
	const onChangeToPrice = value => {
		const price = value / rates[toCurrency];
		const result = price * rates[fromCurrency];
		setToPrice(value);
		setFromPrice(result);
	};
	return (
		<div className='App'>
			<Block
				value={fromPrice}
				currency={fromCurrency}
				onChangeCurrency={setFromCurrency}
				onChangeValue={onChangeFromPrise}
			/>
			<Block
				value={toPrice}
				currency={toCurrency}
				onChangeCurrency={setToCurrency}
				onChangeValue={onChangeToPrice}
			/>
		</div>
	);
};

export default App;
