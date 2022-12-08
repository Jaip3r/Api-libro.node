const pool = require('../db');

const getBooks = async (req, res) => {

    try{

        const[rows] = await pool.query('SELECT * FROM books');
        res.json(rows);

    }catch(error){

        return res.status(500).json({
            message: "Something went wrong"
        });

    }

};

const getOneBook = async (req, res) => {

    try{

        const[rows] = await pool.query('SELECT * FROM books WHERE id = ?', [req.params.id]);

        if(rows.length <= 0) return res.status(404).json({
            message: 'Book not found'
        }) 

        res.json(rows[0]);

    } catch(error) {

        return res.status(500).json({
            message: "Something went wrong"
        });

    }

};

const createBook = async (req, res) => {

    const {titulo, autor, edicion} = req.body;

    try{

        const [rows] = await pool.query('INSERT INTO books (titulo, autor, edicion) VALUES (?, ?, ?)', [titulo, autor, edicion]);
        res.send({
            id: rows.insertId,
            titulo,
            autor,
            edicion
        }); 

    }catch (error){

        return res.status(500).json({
            message: "Something went wrong"
        });

    }

}

const updateBook = async (req, res) => {

    const {id} = req.params;
    const {titulo, autor, edicion} = req.body;

    try{

        const [result] = await pool.query('UPDATE books SET titulo = IFNULL(?, titulo), autor = IFNULL(?, autor), edicion = IFNULL(?, edicion) WHERE id = ?', [titulo, autor, edicion, id]);

        if(result.affectedRows === 0) return res.status(404).json({
            message: "Book does not exist"
        });

        const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [id]);

        res.json(rows[0]);

    } catch (error){

        return res.status(500).json({
            message: "Something went wrong"
        });

    }

};

const deleteBook = async (req, res) => {

    try{

        const [result] = await pool.query('DELETE FROM books WHERE id = ?', [req.params.id]);

        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: 'Book not found'
            })
        }

        res.sendStatus(204);

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }

};

module.exports = {
    getBooks,
    getOneBook,
    createBook,
    updateBook,
    deleteBook
}