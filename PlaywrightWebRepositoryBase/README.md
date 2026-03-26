

## Configuración de un Nuevo Proyecto

Para configurar un nuevo proyecto utilizando esta plantilla, sigue los siguientes pasos:

1. **Clonar el Repositorio**

   Clona este repositorio en tu máquina local usando el siguiente comando:

   ```bash
   git clone URL
   ```


2. **Instalar Dependencias**

    Instala las dependencias necesarias para el proyecto ejecutando:

    ```bash
    npm install
    ```



## Ejecución del proyecto

Para ejecutar el proyecto, utiliza el siguiente comando en la terminal:

```bash
npm test --tags="@login" --env="qa" --tbrowser="Chrome"
```

### Opciones de Navegador

Puedes especificar el navegador en el que deseas ejecutar tus pruebas utilizando la opción `--tbrowser`. Las opciones disponibles son:

| Navegador | Valor    |
|-----------|----------|
| CHROME    | Chrome   |
| FIREFOX   | Firefox  |
| WEBKIT    | Webkit   |
| EDGE      | Edge     |

> [!TIP]
> Por defecto, el navegador configurado es `Chrome` y el entorno es `qa`.
