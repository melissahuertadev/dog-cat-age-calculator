import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from "./components/Button";
import PetForm from "./components/PetForm";
import PetCard from "./components/PetCard";
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

  const handleCalculate = ({type, breedData, age, petName}) => {
    const humanAge = calculateHumanAge(type, age);
    setResult({type, breedData, age, humanAge, petName});
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
