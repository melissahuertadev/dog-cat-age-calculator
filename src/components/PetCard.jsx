import notFoundImg from '../../public/images/pet-not-found.png';

function PetCard({ data }) {
    if (!data) return null;

    const { type, breedData, age, humanAge, petName } = data;

    const handleShare = () => {
        const text = `${type === "dog" ? "🐶" : "🐱"} ${breedData?.name ?? "Mascota"} tiene ${age} años, que son ${humanAge} años humanos.`;
            if (navigator.share) {
                navigator.share({ title: "Pet Age", text });
            } else {
                navigator.clipboard.writeText(text);
                alert("Texto copiado al portapapeles");
            }
    };

    return (
        <div className="flex flex-col md:flex-row items-start bg-white border border-gray-200 rounded-lg shadow-sm max-w-xl mx-auto hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            {/* Imagen */}
            <img
                src={breedData?.image || notFoundImg}
                alt={breedData?.name || "Mascota"}
                className="object-contain w-full h-64 md:h-auto md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
            />

            {/* Contenido */}
            <div className="flex flex-col justify-start p-4 text-left">
                <h2 className="text-2xl font-bold">{petName || "Mascota"}</h2>
                <p className="text-gray-700 dark:text-gray-400">Tipo: {type === "dog" ? "Perro 🐶" : "Gato 🐱"}</p>
                <p className="text-gray-700 dark:text-gray-400">Raza: {breedData?.name || "Desconocido"}</p>
                <p className="text-gray-700 dark:text-gray-400">Edad: {age} años ({humanAge} años humanos)</p>
                <button
                onClick={handleShare}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                Compartir
                </button>
            </div>
        </div>
    );
}

export default PetCard