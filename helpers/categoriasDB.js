import Categoria from "../models/categoria.js"

   const existeCategoriaById= async (id) => {
        const existe = await Categoria.findById(id)

        if (!existe) {
            throw new Error(`El id no existe ${id}`)
        }
    }

    const existeCategoriaNombre= async (nombre) => {
        const existe = await Categoria.findOne({nombre})

        if (existe) {
            throw new Error(`El nombre de a categoria ya existe ${nombre}`)
        }
    }




export {existeCategoriaById,existeCategoriaNombre}