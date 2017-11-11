FROM httpd:2.4
MAINTAINER Anderson Junqueira (anderson.junqueira@gmail.com)

ARG BUILD_FOLDER

RUN apt-get update 
RUN apt-get install -y unzip

# PASSAR O PARAMETRO DO ARQUIVO BIN DO JAVA
COPY ${BUILD_FOLDER}/* /usr/local/apache2/htdocs/

