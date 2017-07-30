@ECHO OFF

ren Modelo.actions.js %1.actions.js
ren Modelo.js %1.js
ren Modelo.reducers.js %1.reducers.js
ren ModeloForm.js %1Form.js
ren ModeloList.js %1List.js

ECHO Pode excluir esse arquivo .bat