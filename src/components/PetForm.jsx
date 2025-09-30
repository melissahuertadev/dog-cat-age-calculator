import { useState } from "react";
import Button from "./Button";
import breedsData from "../../public/breeds.json";

const dogs = breedsData.dogs;
const cats = breedsData.cats;

function PetForm({onCalculate}) {
    const [type, setType] = useState("cat");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [petName, setPetName] = useState("");
    const [petNameError, setPetNameError] = useState("");
    const [ageError, setAgeError] = useState("");

    const breeds = type === "dog" ? dogs : cats;
    const breedData = breed.trim() 
        ? breeds.find(b => b.name.toLowerCase() === breed.toLowerCase().trim()) 
        : null;
    const ageNum = Number(age);

    const isValid = petName &&
        petName.length <= 10 &&
        breedData &&
        age !== "" &&
        ageNum >= 0 &&
        ageNum <= 20 &&
        !petNameError &&
        !ageError;
   
        const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!breed || !age) return;

        onCalculate({ type, breedData, age: Number(age), petName });
     }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 max-w-2xl">
            <div className="space-y-12 w-full">
                <div className="border-b border-gray-900/10 pb-12 dark:border-white/10">
                    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 w-full">
                        {/* Nombre de Mascota */}
                        <div className="col-span-1">
                            <label htmlFor="petname" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Nombre</label>
                            <div className="mt-2">
                                <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline-white/10 dark:focus-within:outline-indigo-500">
                                    <input id="petname" type="text" name="petname" placeholder="Peluchin" value={petName} 
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (value.length > 10) {
                                                setPetNameError("El nombre no puede tener más de 10 letras");
                                            } else {
                                                setPetNameError("");
                                                setPetName(value);
                                            }
                                        }}
                                        className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500"/>
                                    
                                </div>
                                {petNameError && <p className="text-red-500 text-sm mt-1">{petNameError}</p>}
                            </div>
                        </div>

                        {/* Tipo */}
                        <div className="col-span-1">
                            <label htmlFor="type" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Tipo</label>
                            <div className="mt-2">
                                <select id="type" name="type" autoomplete="country-name"  className="w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="cat">🐱 Gato</option>
                                    <option value="dog">🐶 Perro</option>
                                </select>
                            </div>
                        </div>


                        {/* Raza */}
                        <div className="col-span-1">
                            <label
                                htmlFor="breed"
                                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                            >Raza</label>
                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline-white/10 dark:focus-within:outline-indigo-500 mt-2">
                                <input
                                    list="breeds"
                                    placeholder="Escribe o selecciona una raza"
                                    value={breed}
                                    onChange={(e) => setBreed(e.target.value)}
                                    className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500"
                                />
                                <datalist id="breeds">
                                    {breeds.map((b) => (
                                        <option key={b.id} value={b.name} />
                                    ))}
                                </datalist>
                            </div>

                        </div>

                        {/** - cambiar a un date select "Cumpleaños" */}
                        {/* Cumpleaños */}
                        <div className="col-span-1">
                            <label
                                htmlFor="age"
                                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                            >
                                Cumpleaños
                            </label>
                            <div className="mt-2">
                                <input
                                    id="age"
                                    type="number"
                                    placeholder="0"
                                    value={age}
                                    onChange={(e) => {
                                        let value = Number(e.target.value);                       
                                        if (value < 0) {
                                            setAgeError("La edad no puede ser negativa");
                                        } else if (value > 20) {
                                            setAgeError("La edad no puede ser mayor a 20 años");
                                        } else {
                                            setAgeError("");
                                            setAge(value);
                                        }
                                    }}
                                    min="0"
                                    className="block w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:focus:ring-indigo-500"
                                />
                            </div>
                            {ageError && <p className="text-red-500 text-sm mt-1">{ageError}</p>}
                        </div>
                    </div>
                </div>
            </div>
     
            {/* Botón */}
            <Button type="submit" disabled={!isValid} onClick={handleSubmit}>
                Calcular
            </Button>
        </form>
    );
}

export default PetForm;