# CumpleGolMessiCR7

¿Eres fanático de Messi o Cristiano Ronaldo? Ingresa tu fecha de cumpleaños y descubre si alguno de ellos, o ambos, marcaron un gol ese día.

## Descripción

Este proyecto permite a los usuarios ingresar su fecha de cumpleaños y obtener información sobre si Lionel Messi o Cristiano Ronaldo marcaron un gol en esa fecha. 

## Tecnologías Utilizadas

- **Astro**
- **TypeScript**
- **JavaScript**
- **CSS**
- **Tailwind**
- **AlpineJs**


## Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
```sh
git clone https://github.com/StevenSsj1/CumpleGolMessiCR7.git
```
2. Navega al directorio del proyecto:
```sh
cd CumpleGolMessiCR7
```
3. Instala las dependencias:
```sh
pnpm install
```
## Uso
Para iniciar la aplicación, ejecuta el siguiente comando:
```sh
pnpm run dev
```
Luego, abre tu navegador y ve a http://localhost:4321 para ver la aplicación en funcionamiento.

## Detalles del Proyecto

### Web Scraping
Para obtener todos los goles de Messi y Ronaldo, se realizó un web scraping. Estos datos incluyen la fecha del gol, el equipo para el que jugaban, el oponente y el goleador. Este scraping se realizo con python usando colab. 

### Uso de Magicloops
Para asegurar respuestas precisas, se utilizó Magicloops. A Magicloops se le enviaron los datos de la fecha, el equipo, el oponente y el goleador. Esto permitió obtener respuestas exactas, ya que la IA tendía a alucinar mucho sin esta información estructurada.

## Licencia
Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.