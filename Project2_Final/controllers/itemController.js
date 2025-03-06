const model = require('../models/item');

exports.index = (req, res)=>{
    let items = model.find();
    items.sort((a, b) => a.price - b.price);
    res.render('./shop/index', {items});
};

exports.new = (req, res)=>{
    res.render('./shop/new');
};

exports.create = (req, res)=>{
    let item = req.body;
    item.active = true;
    item.image = '../images/' + req.file.filename;
    model.save(item);
    res.redirect('/items');
    console.log(model.find());
};

exports.show = (req, res, next)=>{
    let id = req.params.id;
    let item = model.findById(id);
    if(item) {
        res.render('./shop/show', {item});
    } else {
        let err = new Error('Cannot find item with id ' + id);
        err.status = 404;
        next(err);
    }
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    let item = model.findById(id);
    if(item) {
        res.render('./shop/edit', {item});
    } else {
        let err = new Error('Cannot find item with id ' + id);
        err.status = 404;
        next(err);    
    }
};

exports.update = (req, res, next)=>{
    let item = req.body;
    let id = req.params.id;
    if (model.updateById(id, item, req.file)) {
        res.redirect('/items/' + id);
        console.log(req.file); 
    } else {
        let err = new Error('Cannot find item with id ' + id);
        err.status = 404;
        next(err);    
    }
};

exports.delete = (req, res, next)=>{
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/items');
    } else {
        let err = new Error('Cannot find item with id ' + id);
        err.status = 404;
        next(err);    
    }
};

exports.search = (req, res) => {
    let searchTerm = req.query.q ? req.query.q.toLowerCase().trim() : ""; 
    let items = model.find();
    console.log(model.find());

    let filteredItems = items.filter(item => 
        item.active && 
        (item.title.toLowerCase().includes(searchTerm) || 
         item.details.toLowerCase().includes(searchTerm))
    );

    console.log(searchTerm);
    console.log(filteredItems);

    res.render('shop/index', { items: filteredItems });
};
