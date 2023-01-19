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

  export default categories;