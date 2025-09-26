import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import PetForm from "./components/PetForm";
import PetCard from "./components/PetCard";
import 'aos/dist/aos.css';
import './App.css'

// Actualizar función para calcular edad según tamaño
function calculateHumanAge(type, age) {
  if (type === 'dog') {
    if (age === 1) return 15;
    if (age === 2) return 24;
    return 24 + (age - 2) * 5;
  } else if (type === 'cat') {
    if (age === 1) return 15;
    if (age === 2) return 24;
    return 24 + (age - 2) * 4;
  }
  return null;
}

function App() {
  const [result, setResult] = useState(null);
  const [hasData, setData] = useState(false);

  // Recalcular AOS cuando hay datos
  useEffect(() => {
    AOS.init({ duration: 1000 });
    AOS.refresh();
  }, [hasData])

  const handleCalculate = ({type, breedData, age, petName}) => {
    const humanAge = calculateHumanAge(type, age);
    setResult({type, breedData, age, humanAge, petName});
    setData(true);
  }

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold text-center mb-6'>Calculadora de Edad de Mascota Feliz</h2>
      <p className='text-center text-gray-600 dark:text-gray-400'>Ingresa los datos de tu mascota 🐶🐱</p>
      {
        !hasData ? (
          <div className="mt-6" data-aos="fade-up">
            <PetForm onCalculate={handleCalculate} data-aos="fade-up" />
          </div>) : (
          <div className="mt-6" data-aos="fade-up">
            <PetCard data={result} />
          </div>)
        }
    </div>
  )
}

export default App
