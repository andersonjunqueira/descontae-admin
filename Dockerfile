FROM httpd:2.4
MAINTAINER Anderson Junqueira (anderson.junqueira@gmail.com)

ARG BUILD_FOLDER

COPY ${BUILD_FOLDER}/ /usr/local/apache2/htdocs/

