import { useState } from "react";
import Button from "./Button";
import Select from "./Select";
import dogs from "../../public/breeds/dogs.json";
import cats from "../../public/breeds/cats.json";

function PetForm({onCalculate}) {
    const [type, setType] = useState("cat");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [petName, setPetName] = useState("");
    const [size, setSize] = useState("small");
    const [petNameError, setPetNameError] = useState("");
    const [ageError, setAgeError] = useState("");

    const breeds = type === "dog" ? dogs : cats;
    const breedData = 
        breed.trim() 
        ? breeds.find(b => b.nameEs.toLowerCase() === breed.toLowerCase().trim()) 
        : null;

    // Ordenar razas por nombre en español, donde "Otro" siempre va al final
    const sortedBreeds = [...breeds].sort((a, b) => {
        if (a.nameEs === "Otro") return 1;
        if (b.nameEs === "Otro") return -1;
        return a.nameEs.localeCompare(b.nameEs, "es", { sensitivity: "base" })
    });
    
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
                                    <input id="petname" type="text" name="petname" placeholder="Peluchin" value={petName} autoComplete="off"
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
                        <Select 
                            id="type"
                            label="Tipo"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            options={[
                                { value: "cat", label: "🐱 Gato" },
                                { value: "dog", label: "🐶 Perro" }
                            ]}
                        />

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
                                    autoComplete="off"
                                    onChange={(e) => setBreed(e.target.value)}
                                    className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500"
                                />
                                <datalist id="breeds">
                                    {sortedBreeds.map((b) => (
                                        <option key={b.id} value={b.nameEs} />
                                    ))}
                                </datalist>
                            </div>
                        </div>

                        {/* Tamaño */}
                        {type === "dog" && breed.toLocaleLowerCase() === "otro" && (
                            <Select 
                                id="size"
                                label="Tamaño"
                                value={size}
                                onChange={(e) => setSize(e.target.value)}
                                options={[
                                    { value: "small", label: "Pequeño" },
                                    { value: "medium", label: "Mediano" },
                                    { value: "large", label: "Grande" },
                                    { value: "giant", label: "Gigante" }
                                ]}
                            />
                        )}

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
                                    autoComplete="off"
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