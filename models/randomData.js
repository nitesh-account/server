import mongoose from 'mongoose';

const randomDataSchema = mongoose.Schema({
    data: [{
        field1: Number,
        field2: Number,
        field3: Number,
        field4: Number,
        field5: Number,
        field6: Number,
        field7: Number,
        field8: Number,
        field9: Number,
        field10: Number,
        activeIndicator: {
            type: String,
            default: 'Y'
        },        
        effectiveDate: {
            type: Date,
            default: Date.now
        },
        expiryDate: {
            type: Date,
            default: null
        },
    }]

})

const RandomData = mongoose.model('postRandomData', randomDataSchema);

export default RandomData;