class GuideHelper {
    constructor() {
        this.minValue = 1111111111111;
        this.maxValue = 9999999999999;
    }

    async generateHTML(fechaEnvio, pedido, remitente, destinatario, paquete) {
        const fs = require('fs');
        const svgToDataURL = require('svg-to-dataurl');
        const QRCode = require('qrcode');
        const bwipjs = require('bwip-js');
        let logoURL = fs.readFileSync(`${process.cwd()}/src/assets/logo_largo_completo_negro_sub.svg`);
        logoURL = svgToDataURL(logoURL);
        let dataURL = await QRCode.toDataURL(paquete.guia);
        let barcodeURL = await bwipjs.toBuffer({
            bcid: 'code128',
            text: paquete.guia,
            scale: 3,
            height: 10,
            includetext: false,
            textxalign: 'center'
        });
        barcodeURL = barcodeURL.toString('base64');
        let element = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                table{
                    width: 100%;
                    border-collapse:collapse;
                    margin: 1em;
                }
                
                td{
                    width: 50%;
                    text-align: left;
                    padding: 0.5em;
                }
            </style>
            <title>GUIA</title>
        </head>
        <body>
            <table>
                <tr>
                    <td>
                        <img src="${logoURL}" style="width: 100%;" alt="Logo">
                    </td>
                </tr>
                <tr>
                    <td>
                        <p>FECHA DE ENVIO: ${fechaEnvio}</p>
                        <p>PESO: ${paquete.peso}</p>
                        <p>DIMENSIONES: ${paquete.alto}X${paquete.ancho}X${paquete.largo}</p>
                        <p>PEDIDO: ${pedido}</p>
                    </td>
                    <td>
                        <p><strong>REMITENTE:</strong></p>
                        <p>GERENTE DE TIENDA NA</p>
                        <p>${remitente.calle} ${remitente.numeroExt}</p>
                        <p>${remitente.colonia}</p>
                        <p>${remitente.estado}</p>
                        <p>CP ${remitente.codigoPostal}</p>
                    </td>
                </tr>
                <tr>
                    <td>
                        <p><strong>DESTINATARIO:</strong></p>
                        <p>${destinatario.nombre}</p>
                        <p>CALLE: ${destinatario.calle}</p>
                        <p># EXT ${destinatario.numeroExt}</p>
                        <p>COLONIA: ${destinatario.colonia}</p>
                        <p>CP: ${destinatario.codigoPostal}</p>
                        <p>DEL/MUNICIPIO: ${destinatario.municipio}</p>
                        <p>ESTADO: ${destinatario.estado}</p>
                        <p>REFERENCIAS: ${destinatario.referencias}</p>
                        <p>TELOFONO: ${destinatario.telefono}</p>
                    </td>
                    <td>
                        <p><strong>(MX)</strong></p>
                        <img src="${dataURL}" alt="Logo" style="width: 100%;">
                    </td>
                </tr>
                <tr>
                    <td>
                        <p><strong>GUIA# ${paquete.guia}</strong></p>
                        <p><strong>SERV# MONLOG SAMEDAY</strong></p>
                        <p><strong>TRANS# EXPRESS</strong></p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center;">
                        <img src="data:image/png;base64,${barcodeURL}" alt="barcode" style="max-height: 100%; width: 100%;">
                    </td>
                </tr>
            </table>
        </body>
        </html>
        `;

        return element

    }

    generateGuide() {
        return Math.floor((Math.random() * (this.maxValue - this.minValue + 1)) + this.minValue).toString();
    }

    generatePDF(html) {
        const path = require('path');
        const pdf = require('html-pdf');
        const { encode } = require('base64-arraybuffer');
        return new Promise((resolve, reject) => {
            pdf.create(html,
              {
                phantomPath: path.resolve(process.cwd(),"node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs.exe"), 
                phantomArgs: [path.resolve(process.cwd(),"node_modules/html-pdf/lib/scripts/pdf_a4_portrait.js")]
              }).toBuffer( 
                function (err, buffer) {
                  if (err){
                    console.log(err);
                    reject(err)
                  } else {
                    let pdfBase64 = encode(buffer)
                    resolve(pdfBase64)
                  }
              });
          });
    }
};

module.exports = GuideHelper;