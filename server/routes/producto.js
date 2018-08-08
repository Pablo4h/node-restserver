const express = require('express');

const app = express();

let { verificaToken } = require('../middlewares/autenticacion');

let Producto = require('../models/producto');

app.get('/productos', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);


    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({ disponible: true })
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .skip(desde)
        .limit(limite)
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos
            })


        })


});

app.get('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productoDB) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!productoDB) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'El id no existe'
                    }
                });
            }
            res.json({
                ok: true,
                producto: productoDB
            })
        })

});

app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;

    let regex = new RegExp(termino, 'i');
    Producto.find({ nombre: regex })
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')

    .exec((err, productos) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            productos
        })


    })


});
app.post('/productos', verificaToken, (req, res) => {
    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: req.usuario._id

    });
    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

app.put('/productos/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    //Validar campos uderscore
    let body = req.body;

    let productoAct = {
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
    };
    Producto.findByIdAndUpdate(id, productoAct, { new: true, runValidators: true }, (err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    })

});

app.delete('/productos/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    //Validar campos uderscore

    let cambioEstado = {
        disponible: false
    };

    Producto.findByIdAndUpdate(id, cambioEstado, { new: true }, (err, productoBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Producto no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            message: 'Producto Borrado',
            producto: productoBorrado
        })
    })


});

module.exports = app;