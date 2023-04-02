const uuid = require('uuid');
const form = require('../../database/model/form')


exports.addForm = async (req,res)=> {
    try {
        if(!req.body.email) return res.status(204).send({message : 'No email found'})
        
        req.body.uuid = uuid.v4()
        req.body.sections = JSON.parse(req.body.sections)

        // console.log(req.body)

        let data = form(req.body)
        data = await data.save();
        
        if (data)
        return res.send({message : 'Form added successfully !!!'})
    } catch (error) {
        console.log('Error>>',error)
        return res.status(500).send('Something Went Wrong !!!')
    }
}

exports.listForm = async (req,res)=>{
    try {
        // console.log(req.query)
        if(!req.query.email) res.status(204).send({message : "No email found"})

        let {email} = req.query;

        let data = await form.find({email},{uuid : 1,title : 1})

        if(data)
        {
            res.send(data);
        }
        
    } catch (error) {
        console.log('Error>>',error)
        return res.status(500).send('Something Went Wrong !!!')
    }
}


exports.getFormDetails = async (req,res)=>{
    try {
        // console.log(req.query)
        if(!req.query.uuid) res.status(204).send({message : "No uuid found"})

        let {uuid} = req.query;

        let data = await form.findOne({uuid})

        if(data)
        {
            res.send(data);
        }
        
    } catch (error) {
        console.log('Error>>',error)
        return res.status(500).send('Something Went Wrong !!!')
    }
}

exports.editForm = async (req,res)=> {
    try {
        if(!req.body.uuid) return res.status(204).send({message : 'No uuid found'})
        
        req.body.sections = JSON.parse(req.body.sections)

        // console.log(req.body)

        let data = await form.findOneAndUpdate({uuid : req.body.uuid},req.body)

        if (data)
        return res.send({message : 'Form updated successfully !!!'})
    } catch (error) {
        console.log('Error>>',error)
        return res.status(500).send('Something Went Wrong !!!')
    }
}


exports.submitResponse = async (req,res)=> {
    try {
        console.log(req.body)

        return res.send({message : 'Form updated successfully !!!'})
    } catch (error) {
        console.log('Error>>',error)
        return res.status(500).send('Something Went Wrong !!!')
    }
}

