import { useState } from 'react'
import PetForm from "./components/PetForm";
import PetCard from "./components/PetCard";
import './App.css'

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

  const handleCalculate = ({type, breedData, age}) => {
    const humanAge = calculateHumanAge(type, age);
    setResult({type, breedData, age, humanAge});
  }

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold text-center mb-6'>Calculadora de Edad de Mascota</h1>
      <PetForm onCalculate={handleCalculate} />
      <PetCard data={result} />
    </div>
  )
}

export default App
