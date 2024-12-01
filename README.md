# Luna.chan

Bot Asistente que dará las DSU y advertirá de cambios en repositorios del equipo

# Pre-Requisitos

Node v18 o superior

# Configuración

En órden para funcionar, el proyecto requiere de ciertas variables de entorno declaradas

- LUNA_KEY : El código secreto otorgado por Discord para ejecutar el bot
- LUNA_CHANNEL : La ID del canal de Discord por la que el bot debe de enviar sus mensajes
- TRELLO_API_KEY : El código secreto otorgado por Trello para acceder a la cuenta de quien posee el mismo
- TRELLO_TOKEN : El código secreto para validar la API
- TRELLO_REPO : El ID del espacio de trabajo
- LIST_OF_CHORES : El ID de la lista de "Lista de Tareas"
- LIST_OF_IN_PROGRESS : El ID de la lista de "En Proceso"
- LIST_OF_REVIEW : El ID de la lista de "Review"
- PORT: El puerto en el que se va a abrir

# Ejecutar de manera local

1. Clonar el repositorio `git clone https://github.com/Esoteric-Edge-Games/Luna.chan`
2. Instalar las dependencias `npm install`
3. Ejecutar el programa `node index.js`

# Haciendo una DSU

El bot esta configurado para realizar las DSU de manera automática. Para agregar uno, se debe ir al archivo "DSU.JSON" ubicado en la carpeta "JSON", y realizar un template como este: `{ "fecha": Fecha en la que debe de realizarse, "mes": Mes en el que debe realizarse. Debe ser en minúsculas., "hora": Hora en la que debe de enviarse, en formato 12hs, "minuto": Minuto en el que debe de enviarse, "amPm": 'am' o 'pm', "introMessage": Mensaje de introducción (A recomendación, un saludo), "firstQuestion": Primera pregunta, "secondQuestion": Segunda pregunta, "thirdQuestion": Tercera pregunta, "outroMessage": Mensaje de salida (A recomendación, una despedida) }`
