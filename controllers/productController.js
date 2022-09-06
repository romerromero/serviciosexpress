const fs = require("fs");

exports.getAllProducts = (req, res) => {
    const products = JSON.parse(
        fs.readFileSync(`${__dirname}/../data/products.json`)
    );

    res.status(200).json({
        status: "success",
        timeOfRequest: req.requestTime,
        results: products.length,
        data: {
            products,
        },
    });
};

exports.addProduct = (req, res) => {
    const products = JSON.parse(
        fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    products.push(req.body);
    fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));

    res.status(200).json({
        status: "success",
        data: {
            products,
        },
    });
};

exports.getProductById = (req, res) => {
    const products = JSON.parse(
        fs.readFileSync(`${__dirname}/../data/products.json`)
    );

    const foundProduct = products.find((p) => p.id == req.params.id);
    if (foundProduct) {
        res.status(200).json({
            status: "success",
            data: {
                product: foundProduct,
            },
        });
    } else {
        res.status(404).json({
            status: "not found",
        });
    }
};

exports.DeleteProductById = (req, res) => {
    const products = JSON.parse(
        fs.readFileSync(`${__dirname}/../data/products.json`)
    );
    // Buscar Producto, si existe eliminar
    const product = products.find((p) => p.id == req.params.id);

    if (product) {
        fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(" "));
        products.splice(products.indexOf(product), 1);
        fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
        const listproducts = JSON.parse(
            fs.readFileSync(`${__dirname}/../data/products.json`)
        );
        res.status(200).json({
            status: "success",
            data: {
                product: listproducts,
            },
        });
    } else {
        res.status(404).json({
            status: "not found",
        });
    }
};


exports.UpdateProduct = (req, res) => {
    const products = JSON.parse(
        fs.readFileSync(`${__dirname}/../data/products.json`)
    );

    // Buscar Producto, si existe editar
    const product = products.find((p) => p.id == req.body.id);
    if (product) {
        fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify([]));

        products.splice(products.indexOf(product), 1, req.body);
        fs.writeFileSync(`${__dirname}/../data/products.json`, JSON.stringify(products));
        const listproducts = JSON.parse(
            fs.readFileSync(`${__dirname}/../data/products.json`)
        );

        res.status(200).json({
            status: "success",
            data: {
                product: listproducts,
            },
        });
    } else {
        res.status(404).json({
            status: "not found",
        });
    }
};