import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';


export default function Home() {
  const [conversionMeasurements, setConversionMeasurements] = useState([]);
  const [conversionUnits, setConversionUnits] = useState({input: '', output: ''})
  const [convertedValue, setConvertedValue] = useState(0);
  const categories: object = {
    Temperature: {
      measurements: ['Fahrenheit', 'Celsius', 'Kelvin'],
      conversions: {
        'C-F': (c: number) => {return ((9/5) * c) + 32},
        'C-K': (c: number) => {return (c+273.15)},
        'F-C': (f: number) => {return (f-32) * 5/9},
        'F-K': (f: number) => {return (f-32) * 5/9 + 273.15},
      }
    },
    Weight: {
      measurements: ['Pounds', 'Kilograms'],
      conversions: {
        'LB-KG': (lb: number) => {return lb}
      }
    }
  }
  const populateConversionDropdown = () => {
    return conversionMeasurements.map((item, index) => {
      return <option key={index} value={item}>{item}</option>
    })
  }
  const populateCategoryDropdown = () => {
    return Object.keys(categories).map((item, index) => {
      return <option key={index} value={item}>{item}</option>
    })
  }
  const handleUnitChange = async (unitRelevance: string, changeTo: string) => {
    unitRelevance === 'input' ? await setConversionUnits({input: changeTo, output: conversionUnits.output}) : await setConversionUnits({input: conversionUnits.input, output: changeTo});
  }
  const handleCategoryChange = (changeTo: string) => {
    setConversionMeasurements(categories[changeTo].measurements);
    const input = document.getElementById('input-dropdown').value; 
    const output = document.getElementById('output-dropdown').value;
    setConversionUnits({input, output})
  }
  const handleConversion = () => {
    const input: string = conversionUnits.input, output: string = conversionUnits.output;

    if (typeof window === 'object') {
    const inputElement = document.getElementById('conversion-input');
    let inputValue: string | number | undefined = 0;
    if (inputElement != null) {
      inputValue = Number((inputElement as HTMLInputElement | null)?.value); 
    }


    if (input === output) {
      setConvertedValue(inputValue);
      return;
    }
    if (input === 'Fahrenheit') {
      const conversions = categories.Temperature.conversions;
      switch(output) {
        case 'Celsius':
          setConvertedValue(conversions['F-C'](inputValue));
          break;
        case 'Kelvin':
          setConvertedValue(conversions['F-K'](inputValue));
          break; 
      }
    } else if (input === 'Celsius') {
      const conversions = categories.Temperature.conversions;
      switch (output) {
        case 'Fahrenheit':
          setConvertedValue(conversions['C-F'](inputValue));
          break;
        case 'Kelvin':
          setConvertedValue(conversions['C-K'](inputValue));
          break;
      }
    }
  }
  }
  useEffect(() => {
    setConversionMeasurements(categories['Temperature'].measurements);
  }, [])
  useEffect(() => {
    setConversionUnits({input: conversionMeasurements[0], output: conversionMeasurements[1]})
  }, [conversionMeasurements])
  useEffect(() => {
    handleConversion();
  }, [conversionUnits])
  return (
    <>
      <Head>
        <title>Unit Converter</title>
        <meta name="description" content="A multipurpose unit converter" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <select id='category-dropdown' defaultValue='Temperature' name='conversion-category' onChange={(event) => handleCategoryChange(event.target.value)}>
          {populateCategoryDropdown()}          
        </select>
        
        <div>
          <select value={conversionUnits.input} id='input-dropdown' defaultValue='Fahrenheit' onChange={(event) => handleUnitChange('input', event.target.value)}>
            {populateConversionDropdown()}
          </select>
          <label htmlFor='conversion-input'>Input: </label>
          <input type='text' id='conversion-input' name='conversion-input' onChange={handleConversion}/>
        </div>
        
        <div>
          <select value={conversionUnits.output} id='output-dropdown' defaultValue='Celsius' onChange={(event) => handleUnitChange('output', event.target.value)}>
            {populateConversionDropdown()}
          </select>
          <div id='conversion-output'>
            {convertedValue}
          </div>
        </div>
      </main>
    </>
  )
}
