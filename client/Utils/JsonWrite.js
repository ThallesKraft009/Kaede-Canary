const fs = require('fs');

module.exports = class JSONWriter {
    constructor(filename) {
        this.filename = filename;
    }

    writeData(data) {
        const jsonData = JSON.stringify(data, null, 2);

        fs.writeFile(this.filename, jsonData, 'utf8', (err) => {
            if (err) {
                console.error('Erro ao escrever arquivo:', err);
            } else {
                console.log('Arquivo JSON foi escrito com sucesso.');
            }
        });
    }
}