import Button from "./Button";
import notFoundImg from '../../public/images/pet-not-found.png';

function PetCard({ data }) {
    if (!data) return null;

    const { type, breedData, age, humanAge, petName, size } = data;

    const handleShare = () => {
        const text = `${type === "dog" ? "🐶" : "🐱"} ${breedData?.nameEs ?? "Mascota"} tiene ${age} años, que son ${humanAge} años humanos.`;
            if (navigator.share) {
                navigator.share({ title: "Pet Age", text });
            } else {
                navigator.clipboard.writeText(text);
                alert("Texto copiado al portapapeles");
            }
    };
    
    const translateSize = (size) => {
        switch (size) {
            case "small": return "Pequeño";
            case "medium": return "Mediano";
            case "large": return "Grande";
            case "giant": return "Gigante";
            default: return size;
        }
    }

    return (
        <div className="flex flex-col md:flex-row items-stretch bg-white border border-gray-200 rounded-lg shadow-sm max-w-xl mx-auto hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            {/* Contenedor de la imagen con fondo */}
            <div className="bg-cyan-100 w-full h-96 md:h-auto md:w-48 md:rounded-l-lg rounded-t-lg  flex-shrink-0">
                <img
                    src={breedData?.image || notFoundImg}
                    alt={breedData?.nameEs || "Mascota"}
                    className="object-cover w-full h-full block"
                />
            </div>
            

            {/* Contenido */}
            <div className="flex flex-col justify-start p-4 flex-1 text-left">
                <h2 className="text-2xl font-bold">{petName || "Mascota"}</h2>
                <p className="text-gray-700 dark:text-gray-400">Tipo: {type === "dog" ? "Perro 🐶" : "Gato 🐱"}</p>
                {size && <p className="text-gray-700 dark:text-gray-400">Tamaño: {translateSize(size)}</p>}
                <p className="text-gray-700 dark:text-gray-400">Raza: {breedData?.nameEs || "Otro"}</p>
                
                <p className="text-gray-700 dark:text-gray-400">Edad: {age} años ({humanAge} años humanos)</p>
                <div className="items-center">
                    <Button onClick={handleShare} color="#a55d1eff">Compartir</Button>
                </div>
            </div>
        </div>
    );
}

export default PetCard