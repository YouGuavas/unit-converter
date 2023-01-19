import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import categories from './utils/conversions';


export default function Home() {
  const [conversionMeasurements, setConversionMeasurements] = useState(['', '']);
  const [conversionUnits, setConversionUnits] = useState({input: '', output: ''})
  const [convertedValue, setConvertedValue] = useState('0');
  
  /* =====================
  type Categories = {
    [key: string]: {
      measurements: string[];
      conversions: {
        [key: string]: Function;
      };
    };
  }
   const categories: Categories = {
    'Temperature': {
      measurements: ['Fahrenheit', 'Celsius', 'Kelvin'],
      conversions: {
        'C-F': (c: number) => {return ((9/5) * c) + 32},
        'C-K': (c: number) => {return (c+273.15)},
        'F-C': (f: number) => {return (f-32) * 5/9},
        'F-K': (f: number) => {return (f-32) * 5/9 + 273.15},
        'K-F': (k: number) => {return (k-273.15)*9/5+32},
        'K-C': (k: number) => {return (k-273.15)},
      },
    },
    'Weight': {
      measurements: ['Pounds', 'Kilograms', 'Stone'],
      conversions: {
        'LB-KG': (lb: number) => {return lb/2.205},
        'LB-ST': (lb: number) => {return lb/14},
        'ST-LB': (st: number) => {return st*14},
        'ST-KG': (st: number) => {return st*6.35},
        'KG-ST': (kg: number) => {return kg/6.35},
        'KG-LB': (kg: number) => {return kg*2.205},
      }
    },
    'Distance': {
      measurements: ['Miles', 'Yards', 'Feet', 'Inches', 'Centimeters', 'Meters', 'Kilometers'],
      conversions: {
        'MI-KM': (mi: number) => {return mi},
      }
    }
  }
/* ===================== */

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

  /* ===================== */
  const handleConversion = () => {
    
    const input: string = conversionUnits.input, output: string = conversionUnits.output;
    if (typeof window === 'object') {
    const inputElement = document.getElementById('conversion-input');
    let inputValue: string | number | undefined = 0;
    if (inputElement != null) {
      inputValue = Number((inputElement as HTMLInputElement | null)?.value);
      if (Number.isNaN(inputValue)) {
        alert('Please use only numbers.');
        return; 
      }
    }

    if (input === output) {
      setConvertedValue(inputValue.toString());
      return;
    }
    //Temperature
    if (input === 'Fahrenheit') {
      const conversions = categories.Temperature.conversions;
      switch(output) {
        case 'Celsius':
          setConvertedValue(`${conversions['F-C'](inputValue)} C.`);
          break;
        case 'Kelvin':
          setConvertedValue(`${conversions['F-K'](inputValue)} K.`);
          break; 
      }
    } else if (input === 'Celsius') {
      const conversions = categories.Temperature.conversions;
      switch (output) {
        case 'Fahrenheit':
          setConvertedValue(`${conversions['C-F'](inputValue)} F.`);
          break;
        case 'Kelvin':
          setConvertedValue(`${conversions['C-K'](inputValue)} K.`);
          break;
      }
    } else if (input === 'Kelvin') {
      const conversions = categories.Temperature.conversions;
      switch (output) {
        case 'Fahrenheit':
          setConvertedValue(`${conversions['K-F'](inputValue)} F.`);
          break;
        case 'Celsius':
          setConvertedValue(`${conversions['K-C'](inputValue)} C.`);
          break;
      }
    }
    //Weight
    else if (input === 'Pounds') {
      const conversions = categories.Weight.conversions;
      switch (output) {
        case 'Kilograms':
          setConvertedValue(`${conversions['LB-KG'](inputValue)} kg.`);
          break;
        case 'Stone':
          setConvertedValue(`${conversions['LB-ST'](inputValue).toString()} st.`);
          break;
      }
    } else if (input === 'Stone') {
      const conversions = categories.Weight.conversions;
      switch (output) {
        case 'Pounds':
          setConvertedValue(`${conversions['ST-LB'](inputValue)} lb.`);
          break;
        case 'Kilograms':
          setConvertedValue(`${conversions['ST-KG'](inputValue)} kg.`);
          break;
      }
    } else if (input === 'Kilograms') {
      const conversions = categories.Weight.conversions;
      switch (output) {
        case 'Pounds':
          setConvertedValue(`${conversions['KG-LB'](inputValue)} lb.`);
          break;
        case 'Stone':
          setConvertedValue(`${conversions['KG-ST'](inputValue)} st.`);
          break;

      }
    }
    //Distance
  }
  }
  /* ===================== */

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
          <input type='text' id='conversion-input' name='conversion-input' defaultValue='0' onChange={handleConversion} />
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
