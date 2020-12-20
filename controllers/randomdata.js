import RandomData from '../models/randomData.js'

export const getRandomData = async (req, res) => {
    try {
        const randomData = await RandomData.find();

        res.status(200).json(randomData.length == 0 ? { data: [] } : randomData[0]);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const createRandomData = async (req, res) => {
    let randomData = { data: [] }
    const randomDataArray = Array.from({ length: 10000 }, () => ({
        field1: randomIntegerInRange(0, 10),
        field2: randomIntegerInRange(0, 10),
        field3: randomIntegerInRange(0, 10),
        field4: randomIntegerInRange(0, 10),
        field5: randomIntegerInRange(0, 10),
        field6: randomIntegerInRange(0, 10),
        field7: randomIntegerInRange(0, 10),
        field8: randomIntegerInRange(0, 10),
        field9: randomIntegerInRange(0, 10),
        field10: randomIntegerInRange(0, 10)
    }))

    randomData.data = randomDataArray;

    const newRandomData = new RandomData(randomData);
    try {
        await RandomData.deleteMany({});
        await newRandomData.save();

        res.status(201).json(newRandomData);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const resetRandomData = async (req, res) => {
    try {
        let emptyResData = { data: [] };
        const deleteRandomData = await RandomData.deleteMany({})

        res.status(200).json(emptyResData);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const deleteRandomData = async (req, res) => {
    try {
        await RandomData.updateMany({},
            { $set: { "data.$[elem].activeIndicator": 'N', "data.$[elem].expiryDate": new Date() } },
            { arrayFilters: [{ "elem.activeIndicator": 'Y' }] }
        )

        const updatedRandomData = await RandomData.find()
        res.status(200).json(updatedRandomData.length == 0 ? { data: [] } : updatedRandomData[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

export const expireRandomData = async (req, res) => {
    try {
        const updateRandomData = await RandomData.updateMany({},
            { $set: { "data.$[elem].expiryDate": new Date() } },
            { arrayFilters: [{ "elem.expiryDate": null }] }
        )
        const updatedRandomData = await RandomData.find()
        res.status(200).json(updatedRandomData.length == 0 ? { data: [] } : updatedRandomData[0]);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
