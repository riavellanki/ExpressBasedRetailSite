const {v4: uuidv4} = require('uuid');

const items = [
    {
        id: '1',
        title: "Red Bridal Lehenga",
        seller: "Ananya Patel",
        condition: "Like New",
        price: 25000,
        details: "Gorgeous designer red bridal lehenga with intricate embroidery. Worn once for a wedding. Comes with matching dupatta and blouse.",
        image: "/images/lehenga1.webp",
        active: true,
        offers: 2
    },
    {
        id: '2',
        title: "Golden Banarasi Saree",
        seller: "Meera Sharma",
        condition: "Good",
        price: 15000,
        details: "Elegant golden Banarasi saree with intricate zari work. Perfect for festive occasions and weddings.",
        image: "/images/saree1.avif",
        active: true,
        offers: 1
    },
    {
        id: '3',
        title: "Pink Designer Lehenga",
        seller: "Sanya Kapoor",
        condition: "Brand New",
        price: 30000,
        details: "A stunning pink designer lehenga with heavy embellishments. Never worn, in pristine condition.",
        image: "/images/lehenga2.jpg",
        active: true,
        offers: 0
    },
    {
        id: '4',
        title: "Royal Blue Kanjivaram Saree",
        seller: "Priya Iyer",
        condition: "Like New",
        price: 22000,
        details: "Traditional royal blue Kanjivaram saree with gold border. Worn once for a family event.",
        image: "/images/saree2.webp",
        active: true,
        offers: 3
    },
    {
        id: '5',
        title: "Ivory & Gold Wedding Lehenga",
        seller: "Neha Verma",
        condition: "Good",
        price: 20000,
        details: "Exquisite ivory and gold wedding lehenga with handcrafted embroidery. Slightly used but in excellent condition.",
        image: "/images/lehenga3.avif",
        active: true,
        offers: 1
    },
    {
        id: '6',
        title: "Maroon Silk Saree",
        seller: "Radhika Menon",
        condition: "Fair",
        price: 12000,
        details: "Rich maroon silk saree with traditional motifs. Comfortable and elegant, suitable for any occasion.",
        image: "/images/saree3.jpg",
        active: true,
        offers: 0
    }
];

exports.find = () => {
    return items.map(item => Object.assign({}, item)); // Ensure normal objects
};

exports.findById = id => items.find(item=>item.id === id);

exports.save = function (item) {
    item.id = uuidv4();
    item.offers = 0;
    items.push(item);
};

exports.updateById = function(id, newItem, file) {
    let item = items.find(item=>item.id === id);
    if(item) {
        item.title = newItem.title;
        item.seller = newItem.seller;
        item.condition = newItem.condition;
        item.price = newItem.price;
        item.details = newItem.details;
        item.offers = item.offers;
        if (file) {
            item.image = '../images/' + file.filename;
        }
        return true;
    } else {
        return false;
    }
};

exports.deleteById = function(id){
    let index = items.findIndex(item=>item.id === id);
    if(index !== -1){
        items.splice(index, 1);
        return true;
    } else {
        return false;
    }
}
