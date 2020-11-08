# Entrega 1 - Grupo 4 ![build status](https://travis-ci.com/iic2173/iic2173-proyecto-semestral-grupo4.svg?token=UZa1uHmYTKLCwBgH4i9i&branch=master)

La aplicación se encuentra en: https://d17ec7f25oi1so.cloudfront.net/

El backend se puede acceder desde: https://www.grupo4arquichat.tk

## Consideraciones generales:

- Se agrego el header **Instance-Id** donde va el id de la maquina que respondio el request, se puede hacer un request al root del backend para observarlo.

- Para la creacion de usuario, en nombre escribir un nombre de usuario el cual no puede tener espacios. para la siguiente entrega el back se encargara que esto siemple se cumpla.

## Parte mínima

#### **Backend**
* **RF1: (:heavy_check_mark:)** se envían mensajes en tiempo real mostrando el timestamp.
* **RF2: (:heavy_check_mark:)** se expone endpoint HTTP que realiza el procesamiento y cómputo del chat para permitir desacoplar la aplicación.

* **RF3: (:heavy_check_mark:)** Establecer un AutoScalingGroup con una AMI de su instancia EC2 para lograr autoescalado direccionado desde un ELB (_Elastic Load Balancer_).
    * **(:heavy_check_mark:)** Debe estar implementado el Load Balancer
    * **(:heavy_check_mark:)** Se debe añadir al header del request información sobre cuál instancia fue utilizada para manejar el request. Se debe señalar en el Readme cuál fue el header agregado. **Instance-Id**
* **RF4: (:heavy_check_mark:)** El servidor debe tener un nombre de dominio de primer nivel (tech, me, tk, ml, ga, com, cl, etc).

* **RF4: (:heavy_check_mark:)** El dominio debe estar asegurado por SSL con Let's Encrypt. No se pide *auto renew*. Tambien pueden usar el servicio de certificados de AWS para el ELB
    * **(:heavy_check_mark:)** Debe tener SSL. 
    * **(:heavy_check_mark:)** Debe redirigir HTTP a HTTPS.

#### **Frontend**
* **RF5: (:heavy_check_mark:)** Utilizar un CDN para exponer los *assets* de su frontend. (ej. archivos estáticos, el mismo *frontend*, etc.). Para esto recomendamos fuertemente usar cloudfront en combinacion con S3.
* **RF6: (:heavy_check_mark:)** Realizar una aplicación para el *frontend* que permita ejecutar llamados a los endpoints HTTP del *backend*.
    * **(:heavy_check_mark:)** Debe hacer llamados al servidor correctamente.
    * Elegir **1** de los siguientes. No debe ser una aplicación compleja en diseño. No pueden usar una aplicacion que haga rendering via template de los sitios web. Debe ser una app que funcione via endpoints REST
        * **(:heavy_check_mark:)** Hacer una aplicación web (ej. ReactJS, Vue, Svelte). Utilizamos React.

---

## Sección variable

Se realizo trabajo delegado y mensajes en tiempo real en su completitud, ademas se implemento un caso de uso de cache.

### Trabajo delegado 

**RF: (:heavy_check_mark:)** Seguimos el tutorial que cuenta como 3 (https://medium.com/@manojf/sentiment-analysis-with-aws-comprehend-ai-ml-series-454c80a6114). 

La documentación de esta parte se encuentra en la carpeta docs.

### Mensajes en tiempo real (25%) (15p)

* **RF1: (:heavy_check_mark:)** Cuando se escriben mensajes en un chat/sala que el usuario está viendo, se debe reflejar dicha acción sin que éste deba refrescar su aplicación. 
* **RF2: (:heavy_check_mark:)** Independientemente si el usuario está conectado o no, si es nombrado con @ o # se le debe enviar una notificación (al menos crear un servicio que diga que lo hace, servicio que imprime "se está enviando un correo")
* **RF3: (:heavy_check_mark:)** Debe documentar los mecanismos utilizados para cada uno de los puntos anteriores indicando sus limitaciones/restricciones. La documentación de esta parte se encuentra en la carpeta docs. 

### Caché 
**se realizo solo un caso de uso, este requisito es extra, la documentacion esta en docs**
Para esta sección variable la idea es implementar una capa de Caché para almacenar información y reducir la carga en el sistema. Para almacenar información para la aplicación recomendamos el uso de **Redis**, así como recomendamos Memcached para fragmentos de HTML o respuestas de cara al cliente. 

* **RF1: (:heavy_check_mark:)** Levantar la infraestructura necesaria de caché. Se puede montar en otra máquina o usando el servicios administrado por AWS. Se debe indicar como funciona en local y en producción. 
* **RF2: (:heavy_check_mark:) (❌)** Utilizar la herramienta seleccionada de caché para almacenar las información para al menos 2 casos de uso. Por ejemplo las salas y sus últimos mensajes o credenciales de acceso (login).  

    * **Restricción** Por cada caso de uso debe utilizar alguna configuración distinta (reglas de entrada FIFO/LIFO, estructura de datos o bien el uso de reglas de expiración)
* **RF3: (:heavy_check_mark:) (❌)** Documentar y explicar la selección de la tecnología y su implementación en el sistema. Responder a preguntas como: "¿por qué se usó el FIFO/LRU o almacenar un hash/list/array?" para cada caso de uso implementado. 

Tambien se realizaron caches en el frontend, ocupando el cache del CDN. y tambien ocupando redux-persist para hacer cache de los datos que estan en el store de redux. no sabiendo si estos caches son validos los dejamos afuera.
