# La guía telefónica Paso6

Continuamos con el desarrollo del directorio telefónico. Almacene el estado inicial de la aplicación en el archivo db.json, que debe ubicarse en la raíz del proyecto.

Se traslasdo a vite para trabajar con la terminal


1. Puede instalar el servidor JSON globalmente en su máquina usando el comando 
```
npm install -g json-server
```
Una instalación global requiere privilegios administrativos, lo que significa que no es posible en las computadoras de la facultad o en las computadoras portátiles de primer año.

Sin embargo, no es necesaria una instalación global. Desde el directorio raíz de su aplicación, podemos ejecutar json-server usando el comando npx:

```
npx json-server --port 3001 --watch db.json
```

Hoy en día, prácticamente todos los proyectos de JavaScript se definen utilizando el administrador de paquetes de node, también conocido como npm. Los proyectos creados con create-react-app también siguen el formato npm. Un indicador claro de que un proyecto usa npm es el archivo package.json ubicado en la raíz del proyecto:

Ahora queremos usar axios. En teoría, podríamos definir la librería directamente en el archivo package.json, pero es mejor instalarlo desde la línea de comandos.

```
npm install axios
```

Hagamos otra adición. Instale json-server como una dependencia de desarrollo (solo se usa durante el desarrollo) ejecutando el comando:


```
npm install json-server --save-dev
```

y haciendo una pequeña adición a la parte scripts del archivo package.json:

"server": "json-server -p3001 --watch db.json"

Ahora podemos convenientemente, sin definiciones de parámetros, iniciar json-server desde el directorio raíz del proyecto con el comando:

```
npm run server
```