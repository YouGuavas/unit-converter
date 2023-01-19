import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import {categories, handleConversion} from './utils/conversions';


export default function Home() {
  const [conversionMeasurements, setConversionMeasurements] = useState(['', '']);
  const [conversionUnits, setConversionUnits] = useState({input: '', output: ''})
  const [convertedValue, setConvertedValue] = useState('0');
  

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
  
  const handleUnitChange = (unitRelevance: string, changeTo: string) => {
    unitRelevance === 'input' ? setConversionUnits({input: changeTo, output: conversionUnits.output}) : setConversionUnits({input: conversionUnits.input, output: changeTo});
  }
  
  const handleCategoryChange = (changeTo: string) => {
    setConversionMeasurements(categories[changeTo].measurements);
  }

  useEffect(() => {
    setConversionMeasurements(categories.Temperature.measurements);
  }, [])

  useEffect(() => {
    setConversionUnits({input: conversionMeasurements[0], output: conversionMeasurements[1]});
    const inputElement = (document.getElementById('conversion-input') as HTMLInputElement | null);
    if (inputElement != null) {
      inputElement.value = '0';
    }
  }, [conversionMeasurements])

  useEffect(() => {
    handleConversion(conversionUnits, setConvertedValue);
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
          <select value={conversionUnits.input} id='input-dropdown' onChange={(event) => handleUnitChange('input', event.target.value)}>
            {populateConversionDropdown()}
          </select>
          <label htmlFor='conversion-input'>Input: </label>
          <input type='text' id='conversion-input' name='conversion-input' defaultValue='0' onChange={() => handleConversion(conversionUnits, (x : string) => setConvertedValue(x))} />
        </div>
        
        <div>
          <select value={conversionUnits.output} id='output-dropdown' onChange={(event) => handleUnitChange('output', event.target.value)}>
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
