#!/bin/bash

# Nombre del componente que se pasa como argumento
COMPONENT_NAME=$1
# Ruta del directorio de componentes existente, eliminando la repetición de 'src'
COMPONENT_DIR="components/$COMPONENT_NAME"

# Verificar si la carpeta 'components' ya existe y crear solo la subcarpeta del componente
if [ ! -d "components" ]; then
    echo "Error: La carpeta 'components' no existe en la ruta actual."
    exit 1
fi

# Crear la carpeta del componente
mkdir -p $COMPONENT_DIR

# Crear el archivo del componente con una plantilla básica
cat > $COMPONENT_DIR/$COMPONENT_NAME.js <<EOL
import React from 'react';
import './$COMPONENT_NAME.css';

const $COMPONENT_NAME = () => {
    return (
        <div className="$COMPONENT_NAME">
            <h1>$COMPONENT_NAME Component</h1>
        </div>
    );
};

export default $COMPONENT_NAME;
EOL

# Crear un archivo CSS básico
cat > $COMPONENT_DIR/$COMPONENT_NAME.css <<EOL
.$COMPONENT_NAME {
    font-family: Arial, sans-serif;
    text-align: center;
}
EOL

echo "Componente $COMPONENT_NAME creado con éxito en $COMPONENT_DIR"
