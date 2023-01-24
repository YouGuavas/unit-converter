type Categories = {
    [key: string]: {
      conversions: {
        [key: string]: {
            [key: string]: Function | string
        };
      };
    };
  }
type conversionObject = {
    [key: string]: {
        [key: string]: Function | string
    }
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
            'Centimeters': (yd: number) => {return yd*91.44},
            'Meters': (yd: number) => {return yd*0.9144},
            'Kilometers': (yd: number) => {return yd*0.009144},
            'abbreviation': 'yd'
        },
        'Feet': {
            'Miles': (x: number) => {return x/5280},
            'Yards': (x: number) => {return x/3},
            'Inches': (x: number) => {return x*12},
            'Centimeters': (x: number) => {return x*30.48},
            'Meters': (x: number) => {return x*0.3048},
            'Kilometers': (x: number) => {return x*0.0003048},
            'abbreviation': 'ft'
        },
        'Inches': {
            'Miles': (x: number) => {return x/63360},
            'Yards': (x: number) => {return x/36},
            'Feet': (x: number) => {return x/12},
            'Centimeters': (x: number) => {return x*2.54},
            'Meters': (x: number) => {return x*0.0254},
            'Kilometers': (x: number) => {return x*0.0000254},
            'abbreviation': 'in'
        },
        'Kilometers': {
            'Miles': (x: number) => {return x/1.609},
            'Yards': (x: number) => {return x/0.009144},
            'Feet': (x: number) => {return x/0.0003048},
            'Inches': (x: number) => {return x/0.0000254},
            'Centimeters': (x: number) => {return x*100000},
            'Meters': (x: number) => {return x*1000},
            'abbreviation': 'km'
        },
        'Meters': {
            'Miles': (x: number) => {return x/1609},
            'Yards': (x: number) => {return x/0.9144},
            'Feet': (x: number) => {return x/0.3048},
            'Inches': (x: number) => {return x/0.0254},
            'Centimeters': (x: number) => {return x*100},
            'Kilometers': (x: number) => {return x/1000},
            'abbreviation': 'm'
        },
        'Centimeters': {
            'Miles': (x: number) => {return x/160900},
            'Yards': (x: number) => {return x/91.44},
            'Feet': (x: number) => {return x/30.48},
            'Inches': (x: number) => {return x/2.54},
            'Meters': (x: number) => {return x/100},
            'Kilometers': (x: number) => {return x/100000},
            'abbreviation': 'cm'
        },
      }
    },
    
    
  }

  



  const handleConversion = (conversionUnits: any, setConvertedValue: Function, inputValue: number, ) => {
    
    const input: string = conversionUnits.input, output: string = conversionUnits.output;
    
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
    const conversions : conversionObject = categories[conversionType].conversions;
    const localConvertedValue = (conversions[input][output] as Function)(inputValue).toFixed(2);
    
    

    setConvertedValue(`${localConvertedValue} ${conversions[output].abbreviation}.`)
    
  }

  export {categories, handleConversion} 