import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from "./components/Button";
import PetForm from "./components/PetForm";
import PetCard from "./components/PetCard";
import './App.css'

// Actualizar función para calcular edad según tamaño
function calculateHumanAge(type, age, breedData, size) {
  if (type === 'dog') {
    // Determinar tamaño final: usa el 'size' de la raza, 
    // si es "Otro" usa el que eligió el usuario (size)
    const dogSize = breedData?.size || size || "medium";

    let multiplier;
    switch (dogSize) {
      case "small":
        multiplier = 4;
        break;
      case "medium":
        multiplier = 5;
        break;
      case "large":
        multiplier = 6;
        break;
      case "giant":
        multiplier = 7;
        break;
      default:
        multiplier = 5;
    }


    if (age === 1) return 15;
    if (age === 2) return 24;
    return 24 + (age - 2) * multiplier;
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

  const handleCalculate = ({type, breedData, age, petName, size}) => {
    // Determinar tamaño final del perro (para mostrar en la card también)
    const finalSize = type === "dog" 
    ? (breedData?.size || size || "medium") 
    : null;

    const humanAge = calculateHumanAge(type, age, breedData, size);
    setResult({type, breedData, age, humanAge, petName, size: finalSize});
    setData(true);
  }

  const handleReset = () => {
    setResult(null);
    setData(false);
  };

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold text-center mb-6'>Calculadora de Edad de Mascota Feliz</h2>
      <div className="mt-6">
        <AnimatePresence mode="wait">
          {!hasData ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className='text-center text-gray-600 dark:text-gray-400'>Ingresa los datos de tu mascota 🐶🐱</p>
               <PetForm onCalculate={handleCalculate} />
            </motion.div>
          ) : (
            <motion.div
                key="card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
            >
                <PetCard data={result} />
                <div className="text-center mt-4">
                  <Button onClick={handleReset}>
                    Volver a calcular
                  </Button>
                </div>
              </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
