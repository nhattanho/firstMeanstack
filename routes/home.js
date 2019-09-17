import { Router } from 'express';
const router = Router();

router.get('/', (req,res)=>{
    //	res.send('hello word');
        res.render('index', {title: 'My Express App', message: 'hello'});
    });

module.exports = router;