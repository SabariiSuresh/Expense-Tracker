const csv = require('csv-parser');
const fs = require('fs');
const { ObjectId } = require('mongodb');


function csvFileController(getDataBase) {

    return async function csvFileImporter(req, res) {
        try {

            if (!req.file) {
                return res.json("No file uploaded");
            }

            const db = getDataBase();
            const filePath = req.file.path;
            const userId = new ObjectId(req.user.userId); 
            const results = [];

            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => {
                    if (data.name && data.amount && data.date && data.category) {
                        results.push(
                            {
                                name: data.name,
                                userId: userId,
                                category: data.category,
                                amount: parseFloat(data.amount),
                                data: new Date(data.date)

                            }
                        )
                    }
                })
                .on('end', async () => {
                    if (results.length > 0) {
                        await db.collection('expense').insertMany(results);
                        fs.unlinkSync(filePath);
                        res.json({
                            message: "CSV imported successfully",
                            count: results.length
                        });
                    } else {
                        res.json({
                            message: "No valid data found in CSV",
                            count: 0
                        });
                    }
                })


        } catch (err) {
            console.log("Error ", err);
            return res.json("Internal server error");
        }
    }
}


module.exports = csvFileController;