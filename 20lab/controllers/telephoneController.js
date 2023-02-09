const fs = require('fs').promises;



exports.index = async (req, res, next) => {
    try {
        const data = await fs.readFile('./Telephones.json', 'utf-8');
        const parseData = JSON.parse(data);
        res.render('index', { names: parseData })
    }
    catch (err) {
        next(err);
    }
}



exports.add = async (req, res, next) => {
    try {
        const data = await fs.readFile('./Telephones.json', 'utf-8');
        const parseData = JSON.parse(data);
        res.render('Add', { names: parseData, logicif: true })
    }
    catch (err) {
        next(err);
    }
}




exports.addTelephone = async (req, res, next) => {
    try {
        let data = req.body.String;
        console.log(data);

        const nameIndex = data.lastIndexOf(".");
        const numberIndex = data.lastIndexOf(" ");
        const number = data.substring(numberIndex).trim();
        const fio = data.substring(0, nameIndex + 1).trim();

        const file = await fs.readFile('Telephones.json');
        const json = JSON.parse(file.toString())
        json.push({ FIO: fio, Telephone: number });
        await fs.writeFile("Telephones.json", JSON.stringify(json))
        res.redirect('/');

    }
    catch (err) {
        next(err);
    }

}



exports.update = async (req, res, next) => {
    try {
        const data = await fs.readFile('./Telephones.json', 'utf-8');
        const parseData = JSON.parse(data);
        res.render('Update', { names: parseData, FIO: req.query.FIO, Telephone: req.query.Telephone, logicif: true })
    }
    catch (err) {
        next(err);
    }
}


exports.updateTelephone = async (req, res, next) => {
    try {
        let data = req.body.String;
        console.log(data);

        const nameIndex = data.lastIndexOf(".");
        const numberIndex = data.lastIndexOf(" ");
        const number = data.substring(numberIndex).trim();
        const fio = data.substring(0, nameIndex + 1).trim();

        const file = await fs.readFile('Telephones.json');
        const json = JSON.parse(file.toString())
        json.push({ FIO: fio, Telephone: number });
        await fs.writeFile("Telephones.json", JSON.stringify(json))
        res.redirect('/');
    }
    catch (err) {
        next(err);

    }
}


exports.deleteTelephone = async (req, res,next) => {
    try {

        let body= req.body.String;
        console.log(body);
        const nameIndex = body.lastIndexOf(".");
        const numberIndex = body.lastIndexOf(" ");
        const number = body.substring(numberIndex).trim();
        const fio = body.substring(0, nameIndex + 1).trim();
        const data = await fs.readFile('./Telephones.json', 'utf-8');
        const contacts = JSON.parse(data.toString());
      
        const deleteIndexContact = contacts.findIndex(s => s.FIO === fio && s.Telephone === number);
       
        const deleteContact = contacts.splice(deleteIndexContact, 1);
        await fs.writeFile("Telephones.json", JSON.stringify(contacts));
        res.redirect('/');
        
    }
    catch (err) {
        next(err);
    }
}

