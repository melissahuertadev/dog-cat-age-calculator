import { useState } from "react";
import breedsData from "../../public/breeds.json";

const dogs = breedsData.dogs;
const cats = breedsData.cats;

function PetForm({onCalculate}) {
    const [type, setType] = useState("cat");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");

    const breeds = type === "dog" ? dogs : cats;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!breed || !age) return;

        // buscar el objeto completo de la raza
        const breedData = breeds.find(
            (b) => b.name.toLowerCase() === breed.toLowerCase()
        );

        onCalculate({ type, breedData, age: Number(age) });
     }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
            {/* Tipo */}
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="dog">🐶 Perro</option>
                <option value="cat">🐱 Gato</option>
            </select>

            {/* Raza */}
            <input
                list="breeds"
                placeholder="Escribe o selecciona una raza"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
            />
            <datalist id="breeds">
                {breeds.map((b) => (
                    <option key={b.id} value={b.name} />
                ))}
            </datalist>

            {/* Edad */}
            <input
                type="number"
                placeholder="Edad"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                min="0"
            />
            {/* Botón */}
            <button type="submit">Calcular</button>
        </form>
    );
}

export default PetForm;