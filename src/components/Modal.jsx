import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

function Modal({ show, onClose, onSubmit }) {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    // Regex para validar email
    // Acepta .com, .org, .net, .edu, .pe, etc
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    }

    const handleSubmit = () => {
        if (!validateEmail(email)) {
            setError("Por favor, ingresa un correo válido.");
            return;
        }
        
        setError("");
        onSubmit(email);
    }

    return(
        <AnimatePresence>
            {/*
              * w-[calc(100%-40px)]       * En móviles ocupa todo menos 40px *
              * max-w-[700px]             * Nunca pasa de 700px *
              * sm:w-3/4                  * En >=640px ocupa 75% *
              * md:w-1/2                  * En >=768px ocupa 50% *
              * lg:w-2/5                  * En >=1024px ocupa 40% *
              * xl:w-1/3                  * En >=1280px ocupa 33% *
             */}
            { show && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-lg p-6 w-[calc(100%-40px)] max-w-[700px] sm:w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/3 text-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <h2 className="text-xl font-bold mb-2">🎉 Último paso</h2>
                        <p className="mb-4 text-gray-600">
                            Ingresa tu correo y descubre la edad de tu mascota 🐶🐱.
                            <br />
                            Además, te enviaremos consejos personalizados.
                        </p>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Tu correo"
                            className="w-full border rounded-lg px-3 py-2 mb-3"
                        />
                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                        <div className="flex gap-3 text-center justify-center">
                            {/* Botón gris (izquierda) */}
                            <Button onClick={onClose} color="#c2c1c1ff">
                                No, gracias
                            </Button>

                            {/* Botón azul (derecha) */}
                            <Button
                                onClick={handleSubmit}
                                disabled={!validateEmail(email)}
                            >
                                Quiero mis consejos 🎁
                            </Button>
                        </div>
                    </motion.div>
                </motion.div>   
            )}
        </AnimatePresence>)
    ;
}

export default Modal;