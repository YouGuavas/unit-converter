type Categories = {
    [key: string]: {
      conversions: {
        [key: string]: {
            [key: string]: Function | string
        };
      };
    };
  }

const categories: Categories = {
    'Temperature': {
      conversions: {
        'Fahrenheit': {
            'Celsius': (f: number) => {return (f-32) * 5/9},
            'Kelvin': (f: number) => {return (f-32) * 5/9 + 273.15},
            'abbreviation': 'F'
        },
        'Celsius': {
            'Fahrenheit': (c: number) => {return ((9/5) * c) + 32},
            'Kelvin': (c: number) => {return (c+273.15)},
            'abbreviation': 'C'
        },
        'Kelvin': {
            'Fahrenheit': (k: number) => {return (k-273.15)*9/5+32},
            'Celsius': (k: number) => {return (k-273.15)},
            'abbreviation': 'K'
        },
      },
    },
    'Weight': {
      conversions: {
        'Pounds': {
            'Kilograms': (lb: number) => {return lb/2.205},
            'Stone': (lb: number) => {return lb/14},
            'abbreviation': 'lb'
        },
        'Stone': {
            'Pounds': (st: number) => {return st*14},
            'Kilograms': (st: number) => {return st*6.35},
            'abbreviation': 'st'
        },
        'Kilograms': {
            'Stone': (kg: number) => {return kg/6.35},
            'Pounds': (kg: number) => {return kg*2.205},
            'abbreviation': 'kg'
        },
      }
    },
    'Distance': {
//      measurements: ['Miles', 'Yards', 'Feet', 'Inches', 'Centimeters', 'Meters', 'Kilometers'],
      conversions: {
        'Miles': {
            'Yards': (mi: number) => {return mi*1760},
            'Feet': (mi: number) => {return mi*5280},
            'Inches': (mi: number) => {return mi*63360},
            'Centimeters': (mi: number) => {return mi*160900},
            'Meters': (mi: number) => {return mi*1609},
            'Kilometers': (mi: number) => {return mi*1.609},
            'abbreviation': 'mi'
        },
        'Yards': {
            'Miles': (yd: number) => {return yd/1760},
            'Feet': (yd: number) => {return yd*3},
            'Inches': (yd: number) => {return yd*36},
            'abbreviation': 'yd'
        }
      }
    }
  }

  



  const handleConversion = (conversionUnits: any, setConvertedValue: Function) => {
    
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
    let conversionType : string = '';
   
    Object.keys(categories).map((item) => {
        const measurements = Object.keys(categories[item].conversions);
        if (measurements.indexOf(conversionUnits.input) !== -1) {
            conversionType = item;
            return;
        }
    })
    const conversions = categories[conversionType].conversions;
    
    setConvertedValue(`${conversions[input][output](inputValue)} ${conversions[output].abbreviation}.`)
    
  }
  }

  export {categories, handleConversion} 