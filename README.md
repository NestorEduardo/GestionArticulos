# Currency Quotation

Bienvenido al proyecto de gestión de artículos:

Este proyecto implementa una Web Api RESTful y es consumido por una aplicación de Angular, utilizando buenas practicas y separación de conceptos.

## Tecnologías usadas
- **Backend:** C#, ASP.NET MVC Core
- **Frontend:** Angular

## Pasos para correr
### Clonar el proyecto
- **Verbo http:** GET
- **Url:** https://[[hostname]]/Quotation/USD

### Respuesta
<img alt='Ejemplo de llamada a la api' src="https://currencyquotation.azurewebsites.net/assets/api-request-example.PNG" />

- **updated:** Fecha de la última actualización de la cotización
- **source:** Moneda base de la cotización
- **target:** Moneda a cotizar
- **quantity:** Unidad de cotización
- **amount:** Cotización

## Agregar monedas a cotizar en la aplicación web
Para agregar monedas en la aplicación web, dirigirse al archivo **config.ts** ubicado en la carpeta **src\app\common** de la aplicación Angular

Para ello necesitara saber el código de la moneda
<a href="https://es.wikipedia.org/wiki/ISO_4217#C%C3%B3digos_de_divisa_ISO_4217[nota_1]%E2%80%8B" target="_blank">ISO 4217</a>

<img alt='Ejemplo de llamada a la api' src="https://currencyquotation.azurewebsites.net/assets/currencies-file-exampe.PNG" />

