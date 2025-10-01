import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

function Modal({ show, onClose, onSubmit }) {
    const [email, setEmail] = useState("");

    return(
        <AnimatePresence>
            { show && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center"
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

                        <div className="flex gap-3">
                            <button
                                className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                                onClick={onClose}
                            >
                                No gracias
                            </button>

                            <button
                                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                onClick={() => {
                                onSubmit(email);
                                onClose();
                                }}
                                disabled={!email}
                            >
                                Quiero mis consejos 🎁
                            </button>

                        </div>
                    </motion.div>
                </motion.div>   
            )}
        </AnimatePresence>)
    ;
}

export default Modal;