#!/bin/sh
cd /c/Desenv/projetos/descontae-admin
npm run build
cd build
zip descontae-admin.zip -r .
scp /c/Desenv/projetos/descontae-admin/build/descontae-admin.zip root@213.136.69.6:/opt/bin/descontae-admin.zip