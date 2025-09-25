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
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 max-w-2xl">
            <div class="space-y-12 w-full">
                <div class="border-b border-gray-900/10 pb-12 dark:border-white/10">
                    <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 w-full">
                        {/* Nombre de Mascota */}
                        <div class="col-span-1">
                            <label for="petname" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Nombre</label>
                            <div class="mt-2">
                                <div class="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600 dark:bg-white/5 dark:outline-white/10 dark:focus-within:outline-indigo-500">
                                <input id="petname" type="text" name="petname" placeholder="Peluchin" class="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 dark:bg-transparent dark:text-white dark:placeholder:text-gray-500" />
                                </div>
                            </div>
                        </div>

                        {/* Tipo */}
                        <div class="col-span-1">
                            <label for="type" className="block text-sm/6 font-medium text-gray-900 dark:text-white">Tipo</label>
                            <div className="mt-2">
                                <select id="type" name="type" autocomplete="country-name"  className="w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:*:bg-gray-800 dark:focus:outline-indigo-500" value={type} onChange={(e) => setType(e.target.value)}>
                                    <option value="dog">🐶 Perro</option>
                                    <option value="cat">🐱 Gato</option>
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

                        {/* Edad */}
                        <div className="col-span-1">
                            <label
                                htmlFor="age"
                                className="block text-sm/6 font-medium text-gray-900 dark:text-white"
                            >
                                Edad (años)
                            </label>
                            <div className="mt-2">
                                <input
                                id="age"
                                type="number"
                                placeholder="0"
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                min="0"
                                className="block w-full rounded-md border-0 bg-white py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:focus:ring-indigo-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            


     
            {/* Botón */}
            <button type="submit">Calcular</button>
        </form>
    );
}

export default PetForm;