'use strict';

class userCollections {
    constructor( model ) {
        this.model = model;
    }

    async create( obj ) {
        try{
            return await this.model.create ( obj );
        } catch ( error ) {
            console.error( 'Error during the creation' );
    }
}

    async read( id ) {
        try {
            if ( id ) {
                return await this.model.findOne( { where: { id: id } } );
            } else {
                return await this.model.findAll();
            }
        } catch ( error ) {
            console.error( `Error during the reading with the id: ${id}` );
        }

    }

    async update( id, obj ) {
        try {
            const dataById = await this.model.findOne( { where: { id } } );
            return await dataById.update( obj );
        }
        catch ( error ) {
            console.error( `Error during the updating with the id: ${id}` );
        }
    }

    async delete( id ) {
        try {
            return await this.model.destroy( { where: { id } } );
        } catch ( e ) {
            console.error( `Error while deleting the data with id: ${id}` );
        }
    }
}

module.exports = userCollections;