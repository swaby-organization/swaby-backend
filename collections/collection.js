'use strict';

class Collection {
    constructor ( model ) {
        this.model = model;
    }

    async create ( obj ) {
        try {
            return await this.model.create( obj );
        } catch ( error ) {
            console.error( 'Error during the creation' );
        }
    }

    async read ( id , options) {
        try {
            if ( id ) {
                return await this.model.findOne( { 
                    where: { id: id },
                    include: options,
                } );
            } else {
                return await this.model.findAll({
                    include : options,
                });
            }
        } catch ( error ) {
            console.error( `Error during the reading with the id: ${id}` );
        }
    }

    async update ( id, obj ) {
        try {
            const dataById = await this.model.findOne( { where: { id } } );
            const updatedData = await dataById.update( obj );
            return updatedData;
        }
        catch ( error ) {
            console.error( `Error during the updating with the id: ${id}` );
        }
    }

    async delete ( id ) {
        try {
            const dataById = await this.model.findOne( { where: { id } } );
            const deletedData = await dataById.destroy();
            return deletedData;
        }
        catch ( error ) {
            console.error( `Error during the deleting with the id: ${id}` );
        }
    }
}

module.exports = Collection;
