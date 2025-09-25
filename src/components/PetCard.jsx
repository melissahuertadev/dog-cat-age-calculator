import notFoundImg from '../../public/images/pet-not-found.png';

function PetCard({ data }) {
    if (!data) return null;

    const { type, breedData, age, humanAge } = data;

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
        <div className="border rounded-lg p-4 max-w-sm mx-auto text-center shadow">
            <img src={breedData?.img || notFoundImg} alt={breedData.name} className='w-32 h-32 mx-auto object-contain'/>
            <h2 className="text-xl font-bold mt-2">
                {type === "dog" ? "Perro" : "Gato"}
            </h2>
            <p className="text-gray-600">{breedData?.name || "Desconocido"}</p>
            <p className="mt-2">{age} años = {humanAge} años humanos</p>
            <button
                onClick={handleShare}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Compartir
            </button>
        </div>
    );
}

export default PetCard