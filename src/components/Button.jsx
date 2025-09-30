import React from "react";

function Button({ children, onClick, disabled = false, color = "#602d08ff"}) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`mt-4 px-5 py-2 rounded font-medium text-sm focus:outline-none focus:ring-4
                ${!disabled 
                ? "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            style={!disabled ? { backgroundColor: color } : {}}
        >
            {children}
        </button>
    );
}

export default Button;