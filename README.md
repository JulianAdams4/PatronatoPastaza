# Patronato Pastaza | CITET

Repositorio con el código fuente del sistema del Patronato Provincial del Servicio Social de Pastaza (PPSSPz). 

En este repositorio constan:
- Módulo de Beneficiarios 
- Módulo de Fichas médicas



## Instalación
1) Clonar este repositorio.
- `$ git clone https://github.com/JulianAdams4/PatronatoPastaza.git`

2) Ir a la carpeta clonada y ejecutar el comando:
- `$ yarn`

Esto instalará las dependencias de cada subproyecto dentro de la carpeta


## Uso
### Frontend
Los archivos creados para el frontend seran guardados en la carpeta  `/frontend`  respectivamente. Este subproyecto utiliza [React.js](https://reactjs.org/) en conjunto con [Create-React-App](https://github.com/facebook/create-react-app) para presentar la interfaz de usuario del sistema. Así mismo, también se tomará como referencia las reglas establecidas por [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) para la sintaxis del código fuente. De igual manera, este proyecto puede ser empaquetado en un ejecutable usando [Electron.js](https://electronjs.org/) para futuras versiones de la aplicación.
Para pruebas utilizaremos [Jest.js](https://jestjs.io/) ya que posee muy buena integración con [Create-React-App](). Para los estilos de la aplicación utilizaremos [Sass](https://sass-lang.com/) para una mejor estructura de los estilos.

Requisitos:
  - Tener instalada la última versión LTS de [Node.js](https://nodejs.org/es/) (a la fecha: 10.13.0).
  - Tener instalada la última versión del gestor de paquetes [Yarn](https://yarnpkg.com/lang/en/) (a la fecha: 1.12.3).


### Backend
Los archivos creados para el backend de la aplicación estarán dentro en la carpeta `/backend` respectivamente. Este subproyecto utiliza [Node.js](https://nodejs.org/es/) en conjunto con [Express.js](https://expressjs.com/es/)


Requisitos:
  - Tener instalada la última versión LTS de [Node.js](https://nodejs.org/es/) (a la fecha: 10.13.0).
  - Tener instalada la última versión del gestor de paquetes [Yarn](https://yarnpkg.com/lang/en/) (a la fecha: 1.12.3).

## Obervaciones
### Gestor de paquetes
Para este proyecto se utliza el gestor de paquetes Yarn, pero de igual manera se puede utilizar el gestor por defecto [NPM](https://www.npmjs.com/). Preferimos Yarn porque posee la característica de **Workspaces**, pero esta puede ser realizada con NPM instalando manualmente las dependencias en cada subproyecto. Queda a libre elección del usuario.